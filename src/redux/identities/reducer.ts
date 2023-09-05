import { Action, createReducer, Draft } from '@reduxjs/toolkit'
import {
  ADD_IDENTITIES,
  FETCH_IDENTITIES_FAILED,
  FETCH_IDENTITIES_FULFILLED,
  FETCH_IDENTITIES_PENDING,
  REMOVE_IDENTITY,
  SET_LIST_MODE,
  SET_SORT_MODE,
} from '@Redux/identities/actions'
import { sortIdentities } from '@Helpers/sorting'

const initialState: IdentityState = {
  identities: [],
  pendingFetches: [],
  listMode: false,
}

const identitiesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      FETCH_IDENTITIES_PENDING,
      (
        state: Draft<IdentityState>,
        action: Action<typeof FETCH_IDENTITIES_PENDING> & {
          payload: PendindFetchAction
        }
      ) => {
        state.pendingFetches = [...state.pendingFetches, action.payload]
      }
    )
    .addCase(
      FETCH_IDENTITIES_FULFILLED,
      (
        state: Draft<IdentityState>,
        action: Action<typeof FETCH_IDENTITIES_FULFILLED> & {
          payload: PendindFetchAction
        }
      ) => {
        state.pendingFetches = state.pendingFetches.filter(
          (item) => item !== action.payload
        )
      }
    )
    .addCase(
      FETCH_IDENTITIES_FAILED,
      (
        state: Draft<IdentityState>,
        action: Action<typeof FETCH_IDENTITIES_FAILED> & {
          payload: { fetchActionType: PendindFetchAction; error: Error }
        }
      ) => {
        state.pendingFetches = state.pendingFetches.filter(
          (item) => item !== action.payload.fetchActionType
        )
      }
    )
    .addCase(
      ADD_IDENTITIES,
      (
        state: Draft<IdentityState>,
        action: Action<typeof ADD_IDENTITIES> & {
          payload: { identities: Identity[] }
        }
      ) => {
        state.identities = [...state.identities, ...action.payload.identities]
        state.identities = sortIdentities(state.identities, state.sortMode)
      }
    )
    .addCase(
      REMOVE_IDENTITY,
      (
        state: Draft<IdentityState>,
        action: Action<typeof REMOVE_IDENTITY> & { payload: string }
      ) => {
        state.identities = state.identities.filter(
          (m) => m.id !== action.payload
        )
      }
    )
    .addCase(
      SET_LIST_MODE,
      (
        state: Draft<IdentityState>,
        action: Action<typeof SET_LIST_MODE> & {
          payload: { listMode: boolean }
        }
      ) => {
        state.listMode = action.payload.listMode
      }
    )
    .addCase(
      SET_SORT_MODE,
      (
        state: Draft<IdentityState>,
        action: Action<typeof SET_SORT_MODE> & { payload: string }
      ) => {
        state.sortMode = action.payload
        state.identities = sortIdentities(state.identities, state.sortMode)
      }
    )
})

export default identitiesReducer
