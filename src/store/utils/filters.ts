import { CallTypes, FilterByCriteria, ICall } from 'src/types/Call';

export const filterByCallType = (callsList: ICall[], callType: FilterByCriteria['callType']): ICall[] => {
  if (callType === 'all') {
    return callsList;
  }

  return callsList.filter((callItem) => callItem.in_out === CallTypes[callType]);
};

export const filterBySource = (callsList: ICall[], source: FilterByCriteria['source']): ICall[] => {
  if (source === 'all') {
    return callsList;
  }

  return callsList.filter((callItem) => callItem.source === source);
};

export const filterByGrade = (callsList: ICall[], grade: FilterByCriteria['grade']): ICall[] => {
  if (grade === 'all') {
    return callsList;
  }

  return callsList.filter((callItem) => callItem.grade === grade);
};

// export const checkIsFiltred = (filterByCriteria: FilterByCriteria) => {
//   const filterValues = Object.values(filterByCriteria)
//   return filterValues.some(filterValue => filterValue !== 'all')
// }