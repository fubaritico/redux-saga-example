export type PendindFetchAction = 'ADD_ONE' | 'ADD_MANY' | undefined

export type Identity = {
  id: string
  username: string
  email: string
  birthdate: string
  color: string
}

export type IdentityState = {
  identities: Identity[]
  pendingFetches: PendindFetchAction[]
  listMode: boolean
  sortMode?: string
}
