import { isNotNull, isUndefined } from '../types/TypeGuard'

export class ApiMethods {
  private headers: Headers | undefined

  private async handleResponse(response: Response) {
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText)
    }
    return response.json()
  }

  constructor() {
    if (!import.meta.client) {
      return
    }
    const authToken = localStorage.getItem('authToken')
    this.headers = isNotNull(authToken)
      ? new Headers({ Authorization: `Bearer ${authToken}` })
      : undefined
  }

  async getData(endpoint: string) {
    const url = `/api/${endpoint}`
    const response = await fetch(url, {
      method: 'GET',
      headers: this.headers
    })

    return this.handleResponse(response)
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

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: this.headers
    })

    return this.handleResponse(response)
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

    const response = await fetch(url, {
      method: 'PUT',
      body: formData,
      headers: this.headers
    })

    return this.handleResponse(response)
  }

  async deleteData(endpoint: string) {
    const url = `/api/${endpoint}`

    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.headers
    })

    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText)
    }
  }
}
