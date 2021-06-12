import {defaultStyles, defaultTitle} from '@/constants';
import {cloneObj} from '@core/utils';

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  currentState: '',
  currentStyles: defaultStyles,
  stylesState: {},
  openedDate: new Date().toJSON(),
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentState: '',
})

export function normalizeInitialState(state) {
  return state ? normalize(state) : cloneObj(defaultState)
}
