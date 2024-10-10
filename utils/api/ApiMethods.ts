import { isUndefined } from '../type/TypeGuard'

export class ApiMethods {
  async getData(endpoint: string) {
    const url = `/api/${endpoint}`
    const response = await fetch(url)
    return response.json()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async postData(endpoint: string, data: any) {
    const url = `/api/${endpoint}`
    const formData = new FormData()
    for (const key in data) {
      if (isUndefined(data[key])) {
        continue
      }

      if (Array.isArray(data[key]) && data[key][0] instanceof File) {
        data[key].forEach((file: File) => {
          formData.append(`${key}`, file)
        })
      } else if (data[key] instanceof Date) {
        formData.append(key, data[key].toISOString())
      } else {
        formData.append(key, data[key])
      }
    }

    const headers = new Headers()
    headers.append('Authorization', `Bearer ${localStorage.getItem('authToken')}`)
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers
    })
    return response.json()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async putData(endpoint: string, data: any) {
    const url = `/api/${endpoint}`
    const formData = new FormData()
    for (const key in data) {
      if (isUndefined(data[key])) {
        continue
      }

      if (Array.isArray(data[key]) && data[key][0] instanceof File) {
        data[key].forEach((file: File) => {
          formData.append(`${key}`, file)
        })
      } else if (data[key] instanceof Date) {
        formData.append(key, data[key].toISOString())
      } else {
        formData.append(key, data[key])
      }
    }

    const headers = new Headers()
    headers.append('Authorization', `Bearer ${localStorage.getItem('authToken')}`)
    const response = await fetch(url, {
      method: 'PUT',
      body: formData,
      headers
    })
    return response.json()
  }

  async deleteData(endpoint: string) {
    const url = `/api/${endpoint}`

    const headers = new Headers()
    headers.append('Authorization', `Bearer ${localStorage.getItem('authToken')}`)
    await fetch(url, {
      method: 'DELETE',
      headers
    })
  }
}
