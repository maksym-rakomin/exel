import {CHANGE_TEXT, TABLE_RESIZE} from '@/redux/types';

export function tableResize(data) {
  console.log(444, data)
  return {
    type: TABLE_RESIZE,
    data,
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  }
}
