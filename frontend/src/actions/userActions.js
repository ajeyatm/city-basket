import axios from 'axios'
import ActionTypes from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.USER_LOGIN_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: ActionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: ActionTypes.USER_LOGIN_FAIL,
      payload: error.response?.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}

export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: ActionTypes.USER_LOGOUT })
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.USER_REGISTER_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )

    dispatch({
      type: ActionTypes.USER_REGISTER_SUCCESS,
      payload: data,
    })
    dispatch({
      type: ActionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: ActionTypes.USER_REGISTER_FAIL,
      payload: error.response?.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ActionTypes.USER_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: ActionTypes.USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ActionTypes.USER_DETAILS_FAIL,
      payload: error.response?.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: ActionTypes.USER_UPDATE_PROFILE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/api/users/profile`, user, config)

    dispatch({
      type: ActionTypes.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })

    dispatch({
      type: ActionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))

    dispatch({
      type: ActionTypes.USER_DETAILS_SUCCESS,
      payload: {
        _id: data._id,
        name: data.name,
        email: data.email,
        isAdmin: data.isAdmin,
      },
    })
  } catch (error) {
    dispatch({
      type: ActionTypes.USER_UPDATE_PROFILE_FAIL,
      payload: error.response?.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}
