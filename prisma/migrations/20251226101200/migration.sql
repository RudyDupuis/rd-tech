-- CreateEnum
CREATE TYPE "Mastery" AS ENUM ('advanced', 'intermediate', 'beginner');

-- CreateTable
CREATE TABLE "SoftSkill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "svg" TEXT NOT NULL,

    CONSTRAINT "SoftSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HardSkill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "svg" TEXT NOT NULL,
    "mastery" "Mastery" NOT NULL,

    CONSTRAINT "HardSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingExperience" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "thumbnail" BYTEA,

    CONSTRAINT "TrainingExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobExperience" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "thumbnail" BYTEA,

    CONSTRAINT "JobExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectExperience" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "thumbnail" BYTEA,
    "images" BYTEA[],
    "projectLink" TEXT,
    "codeLink" TEXT,

    CONSTRAINT "ProjectExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HardSkillToProjectExperience" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_HardSkillToProjectExperience_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectExperience_slug_key" ON "ProjectExperience"("slug");

-- CreateIndex
CREATE INDEX "_HardSkillToProjectExperience_B_index" ON "_HardSkillToProjectExperience"("B");

-- AddForeignKey
ALTER TABLE "_HardSkillToProjectExperience" ADD CONSTRAINT "_HardSkillToProjectExperience_A_fkey" FOREIGN KEY ("A") REFERENCES "HardSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HardSkillToProjectExperience" ADD CONSTRAINT "_HardSkillToProjectExperience_B_fkey" FOREIGN KEY ("B") REFERENCES "ProjectExperience"("id") ON DELETE CASCADE ON UPDATE CASCADE;
