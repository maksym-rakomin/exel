import {storage} from '@core/utils';
import {defaultStyles, defaultTitle} from '@/constants';

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  currentState: '',
  currentStyles: defaultStyles,
  stylesState: {},
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentState: '',
})

export const initialState = storage('excel-state') ?
  normalize(storage('excel-state')) :
  defaultState
