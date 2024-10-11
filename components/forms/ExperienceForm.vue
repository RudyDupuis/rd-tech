<script setup lang="ts">
import { PostJobExperience, PutJobExperience } from '~/utils/entities/experiences/JobExperience'
import {
  PostProjectExperience,
  PutProjectExperience
} from '~/utils/entities/experiences/ProjectExperience'
import {
  PostTrainingExperience,
  PutTrainingExperience
} from '~/utils/entities/experiences/TrainingExperience'
import type { GetHardSkill } from '~/utils/entities/skills/HardSkill'
import { ApiMethods } from '~/utils/api/ApiMethods'
import { SkillApi } from '~/utils/api/SkillApi'
import { JobExperienceMapper } from '~/utils/mappers/experiences/JobExperienceMapper'
import { ProjectExperienceMapper } from '~/utils/mappers/experiences/ProjectExperienceMapper'
import { TrainingExperienceMapper } from '~/utils/mappers/experiences/TrainingExperienceMapper'
import { isDefined } from '~/utils/type/TypeGuard'
import { computed, ref, watch } from 'vue'

interface Props {
  getExperiences: () => void
  experience?: PutJobExperience | PutTrainingExperience | PutProjectExperience
}
const props = defineProps<Props>()

const api = new ApiMethods()
const projectExperienceMapper = new ProjectExperienceMapper()
const jobExperienceMapper = new JobExperienceMapper()
const trainningExperienceMapper = new TrainingExperienceMapper()

const skillApi = new SkillApi()
const hardSkills = ref<Array<GetHardSkill>>([])

const thumbnailInput = ref<HTMLInputElement | undefined>(undefined)
const thumbnailUrl = computed<string>(() => {
  return isPutExperience(editingExperience.value) ? editingExperience.value.thumbnailPath : ''
})
const imagesInput = ref<HTMLInputElement | undefined>(undefined)

const selectedtype = ref<'projectExperience' | 'jobExperience' | 'trainingExperience'>(
  'jobExperience'
)
const editingExperience = ref<
  | PutJobExperience
  | PutTrainingExperience
  | PutProjectExperience
  | PostJobExperience
  | PostTrainingExperience
  | PostProjectExperience
>(jobExperienceMapper.emptyPostJobExperience())

const experienceType = computed<
  'project-experiences' | 'job-experiences' | 'training-experiences' | undefined
>(() => {
  if (isProjectExperience(editingExperience.value)) {
    return 'project-experiences'
  }
  if (isJobExperience(editingExperience.value)) {
    return 'job-experiences'
  }
  if (isTrainingExperience(editingExperience.value)) {
    return 'training-experiences'
  }
  return undefined
})

function isPostExperience(
  experience: typeof editingExperience.value
): experience is PostJobExperience | PostTrainingExperience | PostProjectExperience {
  return (
    experience instanceof PostJobExperience ||
    experience instanceof PostTrainingExperience ||
    experience instanceof PostProjectExperience
  )
}
function isPutExperience(
  experience: typeof editingExperience.value
): experience is PutJobExperience | PutTrainingExperience | PutProjectExperience {
  return (
    experience instanceof PutJobExperience ||
    experience instanceof PutTrainingExperience ||
    experience instanceof PutProjectExperience
  )
}
function isProjectExperience(
  experience: typeof editingExperience.value
): experience is PostProjectExperience | PutProjectExperience {
  return experience instanceof PostProjectExperience || experience instanceof PutProjectExperience
}
function isJobExperience(
  experience: typeof editingExperience.value
): experience is PostJobExperience | PutJobExperience {
  return experience instanceof PostJobExperience || experience instanceof PutJobExperience
}
function isTrainingExperience(
  experience: typeof editingExperience.value
): experience is PostTrainingExperience | PutTrainingExperience {
  return experience instanceof PostTrainingExperience || experience instanceof PutTrainingExperience
}

function resetForm() {
  switch (selectedtype.value) {
    case 'projectExperience':
      editingExperience.value = projectExperienceMapper.emptyPostProjectExperience()
      break
    case 'jobExperience':
      editingExperience.value = jobExperienceMapper.emptyPostJobExperience()
      break
    case 'trainingExperience':
      editingExperience.value = trainningExperienceMapper.emptyPostTrainingExperience()
      break
    default:
      editingExperience.value = projectExperienceMapper.emptyPostProjectExperience()
  }
  if (thumbnailInput.value) {
    thumbnailInput.value.value = ''
  }
  if (imagesInput.value) {
    imagesInput.value.value = ''
  }
}

const computedStartDateGetStringSetDate = computed({
  get: () => editingExperience.value.startDate.toISOString().split('T')[0],
  set: (value: string) => {
    editingExperience.value.startDate = new Date(value)
  }
})

const computedEndDateGetStringSetDate = computed({
  get: () =>
    isDefined(editingExperience.value.endDate)
      ? editingExperience.value.endDate.toISOString().split('T')[0]
      : '',
  set: (value: string) => {
    editingExperience.value.endDate = value !== '' ? new Date(value) : undefined
  }
})

async function handleSubmit() {
  try {
    if (experienceType.value) {
      if (isPostExperience(editingExperience.value)) {
        await api.postData(experienceType.value, editingExperience.value)
      }
      if (isPutExperience(editingExperience.value)) {
        await api.putData(
          experienceType.value + '/' + editingExperience.value.id,
          editingExperience.value
        )
      }
      resetForm()
      props.getExperiences()
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

function handleThumbnailUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    editingExperience.value.thumbnail = file
  }
}

function handleImagesUpload(event: Event) {
  const files = (event.target as HTMLInputElement).files
  if (files && isProjectExperience(editingExperience.value)) {
    editingExperience.value.images = Array.from(files)
  }
}

async function handleDelete() {
  try {
    if (isPutExperience(editingExperience.value)) {
      await api.deleteData(experienceType.value + '/' + editingExperience.value.id)
      resetForm()
      props.getExperiences()
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

async function handleRemoveImage(imagePath: string) {
  try {
    if (isPutExperience(editingExperience.value)) {
      await api.postData(experienceType.value + '/remove-image/' + editingExperience.value.id, {
        imagePath: imagePath
      })
      resetForm()
      props.getExperiences()
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

watch(selectedtype, () => {
  editingExperience.value = (() => {
    switch (selectedtype.value) {
      case 'projectExperience':
        return projectExperienceMapper.emptyPostProjectExperience()
      case 'jobExperience':
        return jobExperienceMapper.emptyPostJobExperience()
      case 'trainingExperience':
        return trainningExperienceMapper.emptyPostTrainingExperience()
    }
  })()
})
watch(
  () => props.experience,
  () => {
    if (props.experience) {
      editingExperience.value = props.experience
    }
  }
)

hardSkills.value = await skillApi.getAllHardSkills()
</script>

<template>
  <div class="flex flex-col items-center">
    <h3 class="small-title mb-10">
      {{ (isPostExperience(editingExperience) ? 'Créer' : 'Modifier ') + ' une expérience' }}
    </h3>

    <label v-if="isPostExperience(editingExperience)" for="type">Type</label>
    <select id="type" v-if="isPostExperience(editingExperience)" v-model="selectedtype">
      <option value="projectExperience">Projets</option>
      <option value="jobExperience">Emplois</option>
      <option value="trainingExperience">Formations</option>
    </select>

    <div
      v-if="isPutExperience(editingExperience) && isDefined(editingExperience.thumbnailPath)"
      class="flex flex-col items-center mb-2"
      @dblclick="handleRemoveImage(editingExperience.thumbnailPath)"
    >
      <p>Miniature</p>
      <img
        :src="'/api/' + thumbnailUrl"
        :alt="'Miniature de ' + editingExperience.title"
        style="width: 300px; height: auto"
        class="mb-1"
      />
      <p class="text-false">Double cliquer pour supprimer l'image</p>
    </div>

    <div
      v-if="isPutExperience(editingExperience) && isDefined(editingExperience.imagesPath)"
      class="flex flex-col items-center mb-2"
    >
      <p>Images</p>
      <div
        v-for="(url, index) in editingExperience.imagesPath"
        :key="index"
        @dblclick="handleRemoveImage(url.replace(backUrl, ''))"
      >
        <img
          :src="'/api/' + url"
          :alt="'Image de ' + editingExperience.title"
          style="width: 300px; height: auto"
          class="mb-1"
        />
        <p class="text-false mb-3">Double cliquer pour supprimer l'image</p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <input v-model="editingExperience.title" type="text" placeholder="Titre *" required />
      <label for="startDate">Date de début *</label>
      <input id="startDate" v-model="computedStartDateGetStringSetDate" type="date" required />
      <label for="endDate">Date de fin</label>
      <input id="endDate" v-model="computedEndDateGetStringSetDate" type="date" />
      <textarea
        v-model="editingExperience.shortDesc"
        placeholder="Description courte *"
        required
      ></textarea>
      <label for="thumbnail">Miniature | PNG - 1000px par 500px</label>
      <input
        ref="thumbnailInput"
        type="file"
        id="thumbnail"
        accept=".png"
        @change="handleThumbnailUpload"
      />
      <textarea
        v-if="isProjectExperience(editingExperience)"
        v-model="editingExperience.longDesc"
        placeholder="Description longue *"
        rows="5"
        required
      ></textarea>
      <label v-if="isProjectExperience(editingExperience)" for="hardskills">
        Hard skills liés *
      </label>
      <select
        id="hardskills"
        v-if="isProjectExperience(editingExperience)"
        v-model="editingExperience.hardSkillIds"
        multiple
        required
      >
        <option v-for="(hardskill, index) in hardSkills" :key="index" :value="hardskill.id">
          {{ hardskill.name }}
        </option>
      </select>
      <label v-if="isProjectExperience(editingExperience)" for="images"
        >Images | PNG - 1000px par 500px</label
      >
      <input
        v-if="isProjectExperience(editingExperience)"
        ref="imagesInput"
        type="file"
        id="images"
        accept=".png"
        multiple
        @change="handleImagesUpload"
      />
      <input
        v-if="isProjectExperience(editingExperience)"
        v-model="editingExperience.projectLink"
        type="text"
        placeholder="Lien du projet"
      />
      <input
        v-if="isProjectExperience(editingExperience)"
        v-model="editingExperience.codeLink"
        type="text"
        placeholder="Lien du dépot de code"
      />
      <div v-if="isProjectExperience(editingExperience)" class="f a-cent j-betw mb2">
        <input v-model="editingExperience.isFavorite" id="favorite" type="checkbox" />
        <label for="favorite" class="ml-2">Ajouter aux favories</label>
      </div>

      <div
        class="flex flex-col md:flex-row items-center justify-center w-full space-y-5 md:space-y-0 mb-5"
      >
        <button
          v-if="isPutExperience(editingExperience)"
          type="button"
          class="button md:mr-2"
          @click="resetForm()"
        >
          Annuler
        </button>
        <button type="submit" class="button">
          {{ isPostExperience(editingExperience) ? 'Créer' : 'Modifier ' }}
        </button>
      </div>
    </form>
    <button
      v-if="isPutExperience(editingExperience)"
      type="button"
      class="button"
      @dblclick="handleDelete()"
    >
      Double cliquer pour supprimer
    </button>
  </div>
</template>
