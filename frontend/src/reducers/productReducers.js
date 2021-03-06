import ActionTypes from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ActionTypes.PRODUCT_LIST_REQUEST:
      return { ...state, loading: true }
    case ActionTypes.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    case ActionTypes.PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case ActionTypes.PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case ActionTypes.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case ActionTypes.PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
