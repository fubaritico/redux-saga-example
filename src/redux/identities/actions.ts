import { createAction } from '@reduxjs/toolkit'

export const FETCH_IDENTITIES_PENDING = 'FETCH_IDENTITIES_PENDING'
export const FETCH_IDENTITIES_FULFILLED = 'FETCH_IDENTITIES_FULFILLED'
export const FETCH_IDENTITIES_FAILED = 'FETCH_IDENTITIES_FAILED'
export const FETCH_IDENTITY = 'FETCH_IDENTITY'
export const FETCH_IDENTITIES = 'FETCH_IDENTITIES'
export const ADD_IDENTITIES = 'ADD_IDENTITIES'
export const REMOVE_IDENTITY = 'REMOVE_IDENTITY'
export const SET_LIST_MODE = 'SET_LIST_MODE'
export const SET_SORT_MODE = 'SET_SORT_MODE'

export const setListMode = createAction(SET_LIST_MODE, (listMode: boolean) => ({
  payload: {
    listMode,
  },
}))

export const removeIdentity = createAction(REMOVE_IDENTITY, (id: string) => ({
  payload: id,
}))

export const setSortMode = createAction(SET_SORT_MODE, (sortMode: string) => ({
  payload: sortMode,
}))
