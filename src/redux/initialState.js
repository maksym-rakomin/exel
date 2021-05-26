import {storage} from '@core/utils';
import {defaultStyles} from '@/constants';

const defaultState = {
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
