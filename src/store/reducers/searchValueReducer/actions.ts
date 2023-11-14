import { SearchValueReducerEnum } from './actionTypes.ts';

export const setSearchValueToStore = (newSearchValue: string) => {
  return {
    type: SearchValueReducerEnum.SET_SEARCH_VALUE,
    newSearchValue,
  };
};
