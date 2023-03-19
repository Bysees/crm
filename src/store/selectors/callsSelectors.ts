import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { FilterByCriteria, ICall } from "src/types/Call";
import { RootState } from "../types";
import { filterByCallType, filterByGrade, filterBySource } from "../utils/filters";

export const getCallList = (state: RootState) => state.calls.items.initialList

export const getFiltredCallList = createDraftSafeSelector(
  [getCallList, (state: RootState, filterByCriteria: FilterByCriteria) => filterByCriteria],
  (callList, filterByCriteria) => {

    let filteredList: ICall[] = callList
    const { callType, grade, source } = filterByCriteria

    filteredList = filterByCallType(filteredList, callType)
    filteredList = filterBySource(filteredList, source)
    filteredList = filterByGrade(filteredList, grade)

    return filteredList
  })

  export const checkIsFiltred = (filterByCriteria: FilterByCriteria) => {
    const filterValues = Object.values(filterByCriteria)
    return filterValues.some(filterValue => filterValue !== 'all')
  }

