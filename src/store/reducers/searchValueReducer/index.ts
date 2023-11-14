import { Reducer } from '@reduxjs/toolkit';
import { SearchValueReducerEnum } from './actionTypes.ts';

type SearchValueReducerType = {
  searchString: string;
};

const defaultState = {
  searchString: '',
};

const searchValueReducer: Reducer<SearchValueReducerType> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case SearchValueReducerEnum.SET_SEARCH_VALUE:
      return { ...state, searchString: action.searchString };

    default:
      return { ...state };
  }
};

export default searchValueReducer;
