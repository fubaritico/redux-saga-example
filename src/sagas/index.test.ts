import { all, call, put } from 'redux-saga/effects'
import {
  ADD_IDENTITIES,
  FETCH_IDENTITIES_FAILED,
  FETCH_IDENTITIES_FULFILLED,
  FETCH_IDENTITIES_PENDING,
} from '@Redux/identities/actions'
import * as Sagas from './index'
import { identityFetcher } from './index'

describe.each([[1], [5]])(
  '"fetchIdentities" saga with %i api calls',
  (calls: number) => {
    let gen: Sagas.FetchIdentitiesGenerator

    beforeEach(() => {
      gen = Sagas.fetchIdentities(calls)
    })

    it('should set action for pending fetch identity with "PUT" Effect', () => {
      expect(gen.next().value).toEqual(
        put({
          type: FETCH_IDENTITIES_PENDING,
          payload: calls === 1 ? 'ADD_ONE' : 'ADD_MANY',
        })
      )
    })

    it('should set promises results to "ALL" effect after calling endpoint', () => {
      gen.next()

      const allPromises = gen.next().value

      expect(allPromises).toEqual(
        all(new Array(calls).fill('').map(() => call(identityFetcher)))
      )
    })

    it('should set action for updating store with "PUT" Effect', () => {
      const reponse = new Array(calls).fill({
        birthdate:
          'Tue Aug 17 1993 13:43:44 GMT+0000 (Coordinated Universal Time)',
        username: 'Kadin.Konopelski19',
        email: 'Gage.Hagenes@hotmail.com',
        color: '931f1d',
      })

      gen.next()
      gen.next()

      const identities = gen.next(reponse).value

      expect(gen.next(identities).value).toEqual(
        put({
          type: FETCH_IDENTITIES_FULFILLED,
          payload: calls === 1 ? 'ADD_ONE' : 'ADD_MANY',
        })
      )

      expect(gen.next().value).toEqual(
        put({
          type: ADD_IDENTITIES,
          payload: { identities },
        })
      )
    })

    it('should set action for error notifying store with "PUT" Effect if something wrong happen', () => {
      gen.next()
      gen.next()

      expect(gen.next().value.payload.action.type).toEqual(
        FETCH_IDENTITIES_FAILED
      )
    })
  }
)
