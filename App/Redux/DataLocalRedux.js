import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  dataLocalRequest: ['data'],
  dataLocalSuccess: ['payload'],
  dataLocalFailure: null
})

export const DataLocalTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: [],
  error: null
})

/* ------------- Selectors ------------- */

export const DataLocalSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: INITIAL_STATE.payload })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DATA_LOCAL_REQUEST]: request,
  [Types.DATA_LOCAL_SUCCESS]: success,
  [Types.DATA_LOCAL_FAILURE]: failure
})
