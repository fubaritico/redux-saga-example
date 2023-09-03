export type Identity = {
  id: string
  username: string
  email: string
  birthdate: string
  color: string
}

export type IdentityState = {
  identities: Identity[]
  pendingFetches: string[]
  listMode: boolean
  sortMode?: string
}
