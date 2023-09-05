import { format } from 'date-fns'

export const sortByName = (identities: Identity[]): Identity[] =>
  identities.slice().sort((a, b) => {
    if (a.username < b.username) {
      return -1
    }
    if (a.username > b.username) {
      return 1
    }
    return 0
  })

export const sortByByBirthday = (identities: Identity[]): Identity[] =>
  identities.slice().sort((a, b) => {
    const aDate = Number(format(new Date(a.birthdate), 'T'))
    const bDate = Number(format(new Date(b.birthdate), 'T'))
    return bDate - aDate
  })

export const sortIdentities = (
  identities: Identity[],
  sortMode?: string
): Identity[] => {
  switch (sortMode) {
    case 'name':
      return sortByName(identities)
    case 'birthday':
      return sortByByBirthday(identities)
    default:
      return identities
  }
}
