import axios from "axios"
import { ICall } from "types/Call"

const TOKEN = import.meta.env.VITE_TOKEN
const baseURL = import.meta.env.VITE_API_URL

const http = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${TOKEN}`
  }
})

class ApiService {
  static async getList(dateStart: string, dateEnd: string) {
    try {
    const response = await http.post<{total_rows: string, results: ICall[]}>('/getList', null , {
      params: {
        date_start: dateStart,
        date_end: dateEnd,
        limit: 50,
      }
    })
    
    return response.data
  } catch (error) {

    console.log(error)
    throw error
  }
  }

  static async getRecord(record: string, partnership_id: string) {
    try {
      const response = await http.post<Blob>('/getRecord', null , {
        params: {
          record,
          partnership_id
        },
        responseType: 'blob'
      })
  
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

}

export { ApiService }