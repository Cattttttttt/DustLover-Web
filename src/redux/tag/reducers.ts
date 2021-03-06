import * as Types from '../types'

import { getColorList } from '@/utils'

const defaultState: Types.ListInfo = {
  categoryList: [],
  tagList: []
}

const TagReducer = (state: Types.ListInfo = defaultState, action: Types.SFAPayload<Types.EmptyAction, any>) => {
  const { type, payload } = action
  switch(type) {
    case Types.GET_CATEGORY_LIST:
      const categoryList = getColorList(payload)
      return { ...state, categoryList }

    case Types.GET_TAG_LIST:
      const tagList = getColorList(payload)
      return { ...state, tagList }

    default: return state
  }
}

export default TagReducer