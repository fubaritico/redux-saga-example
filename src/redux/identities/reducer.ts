import { Action, createReducer, Draft } from '@reduxjs/toolkit'
import { fetchIdentities, fetchIdentity } from '@Redux/identities/actions'
import type { Identity, IdentityState } from '@Redux/identities/types'
import { sortIdentities } from '@Helpers/sorting'

const initialState: IdentityState = {
  identities: [],
  pendingFetches: [],
  listMode: false,
}

const identitiesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchIdentity.pending, (state) => {
      state.pendingFetches = [...state.pendingFetches, 'addingOneItem']
    })
    .addCase(fetchIdentity.fulfilled, (state: Draft<IdentityState>) => {
      state.pendingFetches = state.pendingFetches.filter(
        (item) => item !== 'addingOneItem'
      )
    })
    .addCase(fetchIdentity.rejected, (state: Draft<IdentityState>) => {
      state.pendingFetches = state.pendingFetches.filter(
        (item) => item !== 'addingOneItem'
      )
    })
    .addCase(fetchIdentities(5).pending, (state) => {
      state.pendingFetches = [...state.pendingFetches, 'addingFiveItem']
    })
    .addCase(fetchIdentities(5).fulfilled, (state: Draft<IdentityState>) => {
      state.pendingFetches = state.pendingFetches.filter(
        (item) => item !== 'addingFiveItem'
      )
    })
    .addCase(fetchIdentities(5).rejected, (state: Draft<IdentityState>) => {
      state.pendingFetches = state.pendingFetches.filter(
        (item) => item !== 'addingFiveItem'
      )
    })
    .addCase(
      'identities/addIdentities',
      (
        state: Draft<IdentityState>,
        action: Action<'identities/addIdentities'> & {
          payload: { identities: Identity[] }
        }
      ) => {
        state.identities = [...state.identities, ...action.payload.identities]
        state.identities = sortIdentities(state.identities, state.sortMode)
      }
    )
    .addCase(
      'identities/removeIdentity',
      (
        state: Draft<IdentityState>,
        action: Action<'identities/removeIdentity'> & { payload: string }
      ) => {
        state.identities = state.identities.filter(
          (m) => m.id !== action.payload
        )
      }
    )
    .addCase(
      'identities/setListMode',
      (
        state: Draft<IdentityState>,
        action: Action<'identities/setListMode'> & {
          payload: { listMode: boolean }
        }
      ) => {
        state.listMode = action.payload.listMode
      }
    )
    .addCase(
      'identities/setSortMode',
      (
        state: Draft<IdentityState>,
        action: Action<'identities/setSortMode'> & { payload: string }
      ) => {
        state.sortMode = action.payload
        state.identities = sortIdentities(state.identities, state.sortMode)
      }
    )
})

export default identitiesReducer
