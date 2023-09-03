import { createSelector } from '@reduxjs/toolkit'
import { IdentityState } from '@Redux/identities/types'

export const getIdentityState = (state: RootState): IdentityState => state

export const getIdentities = createSelector(
  getIdentityState,
  (state: IdentityState) => state.identities
)

export const getListMode = createSelector(
  getIdentityState,
  (state: IdentityState) => state.listMode
)

export const getSortMode = createSelector(
  getIdentityState,
  (state: IdentityState) => state.sortMode
)

export const getPendingFetches = createSelector(
  getIdentityState,
  (state: IdentityState) => state.pendingFetches
)
