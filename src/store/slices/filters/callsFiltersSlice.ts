import { PayloadAction } from '@reduxjs/toolkit/dist';
import { createSlice } from '@reduxjs/toolkit/dist';
import { FilterByCriteria, FilterByDate } from "src/types/Call"
import { getDateTime, getDateTimeAgo } from 'src/utils/time';

type InitialState = {
  filterByCriteria: FilterByCriteria
  filterByDate: FilterByDate
}

const initialState: InitialState = {
  filterByCriteria: {
    callType: 'all',
    source: 'all',
    grade: 'all'
  },

  filterByDate: {
    title: 'days3',
    startDate: getDateTimeAgo(3, 'day'),
    endDate: getDateTime(new Date())
  },
}


const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<FilterByCriteria>>) => {
      state.filterByCriteria = {
        ...state.filterByCriteria,
        ...action.payload
      }
    },

    setDateFilter: (state, action: PayloadAction<FilterByDate>) => {
      state.filterByDate = action.payload
    },

    resetFilter: (state) => {
      for (let filterKey in state.filterByCriteria) {
        const filter = filterKey as keyof FilterByCriteria;
        state.filterByCriteria[filter] = 'all'
      }

    },

  }
})

const callsFiltersActions = filterSlice.actions
const callsFiltersReducer = filterSlice.reducer

export { callsFiltersActions, callsFiltersReducer }