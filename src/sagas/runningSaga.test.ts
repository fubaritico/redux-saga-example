import {
  FETCH_IDENTITIES_PENDING,
  FETCH_IDENTITIES_FULFILLED,
  ADD_IDENTITIES,
} from '@Redux/identities/actions'
import { AnyAction } from 'redux'
import { runSaga } from 'redux-saga'
import * as Sagas from './index'

describe.each([[1], [5]])(
  '"fetchIdentities" saga with %i api calls',
  (calls: number) => {
    let dispatchedActions: AnyAction[]
    let mockedStore: {
      getState: () => void
      dispatch: (action: AnyAction) => any
    }
    const apiReponse: ApiResult = {
      birthdate:
        'Tue Aug 17 1993 13:43:44 GMT+0000 (Coordinated Universal Time)',
      username: 'Kadin.Konopelski19',
      email: 'Gage.Hagenes@hotmail.com',
      color: '931f1d',
    }

    beforeEach(() => {
      dispatchedActions = []
      mockedStore = {
        getState: () => {},
        dispatch: (action: AnyAction) => dispatchedActions.push(action),
      }

      fetchMock.mockIf(
        /^https?:\/\/exercise-1-backend-dvdomulgfq-ew.a.run.app.*$/,
        (req) =>
          new Promise((resolve, reject) => {
            if (req.url.endsWith('/user')) {
              resolve({ body: JSON.stringify(apiReponse) })
            }

            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              status: 404,
              body: 'Not Found',
            })
          })
      )

      runSaga(mockedStore, Sagas.fetchIdentities, calls)
    })

    it('should dispatch an action to notify the start of the API call', () => {
      expect(dispatchedActions[0]).toEqual({
        type: FETCH_IDENTITIES_PENDING,
        payload: calls === 1 ? 'ADD_ONE' : 'ADD_MANY',
      })
    })

    it('should dispatch an action to notify the successful end of the API call', () => {
      expect(dispatchedActions[1]).toEqual({
        type: FETCH_IDENTITIES_FULFILLED,
        payload: calls === 1 ? 'ADD_ONE' : 'ADD_MANY',
      })
    })

    it('should dispatch an action to notify the successful end of the API call', () => {
      expect(dispatchedActions[2].type).toEqual(ADD_IDENTITIES)
    })
  }
)
