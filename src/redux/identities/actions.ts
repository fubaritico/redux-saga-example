import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { Identity } from '@Redux/identities/types'
import axios from 'axios'

const identityFetcher = () =>
  axios.get('https://exercise-1-backend-dvdomulgfq-ew.a.run.app/user')

export const addIdentities = createAction(
  'identities/addIdentities',
  (identities: Identity[]) => ({
    payload: {
      identities,
    },
  })
)

export const setListMode = createAction(
  'identities/setListMode',
  (listMode: boolean) => ({
    payload: {
      listMode,
    },
  })
)

export const fetchIdentities = (calls: number) =>
  createAsyncThunk('identities/fetchIdentities', async (_, thunkAPI) => {
    const times = new Array(calls).fill(
      'https://exercise-1-backend-dvdomulgfq-ew.a.run.app/user'
    )

    const responses = await Promise.all(times.map((url) => axios.get(url)))

    const identities = responses.map((response) => {
      const identity = response.data
      identity.id = Math.floor(Math.random() * 1000000)
      return identity
    })

    thunkAPI.dispatch(addIdentities(identities))
  })

export const fetchIdentity = createAsyncThunk(
  'identities/fetchIdentity',
  async (_, thunkAPI) => {
    const response = await identityFetcher()
    const identity = response.data
    identity.id = Math.floor(Math.random() * 1000000)
    thunkAPI.dispatch(addIdentities([identity]))
    return response
  }
)

export const removeIdentity = createAction(
  'identities/removeIdentity',
  (id: string) => ({
    payload: id,
  })
)

export const setSortMode = createAction(
  'identities/setSortMode',
  (sortMode: string) => ({
    payload: sortMode,
  })
)
