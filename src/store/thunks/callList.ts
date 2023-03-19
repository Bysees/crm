import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApiService } from "src/service/api"
import { ICall } from "src/types/Call"
import { dataInjection } from "src/utils/injection"

type FetchParams = { startDate: string, endDate: string }
type FetchError = string


export const fetchCallList = createAsyncThunk<ICall[], FetchParams, { rejectValue: FetchError }>(
  'calls/fetchCallList',
  async ({ startDate, endDate }, thunkAPi) => {
    try {
      const response = await ApiService.getList(startDate, endDate)
      const { results: callList } = response

      //* Подмешиваю моковые данные, т.к. api предоставляет слишком мало вариаций.
      const withInjectedDataList = dataInjection(callList)

      return withInjectedDataList
    } catch {
      return thunkAPi.rejectWithValue('Failed to fetch data')
    }
  }
)