import {
  all,
  call,
  put,
  fork,
  take,
  AllEffect,
  CallEffect,
  PutEffect,
  SelectEffect,
} from 'redux-saga/effects'
import {
  ADD_IDENTITIES,
  FETCH_IDENTITIES,
  FETCH_IDENTITIES_FAILED,
  FETCH_IDENTITIES_FULFILLED,
  FETCH_IDENTITIES_PENDING,
  FETCH_IDENTITY,
} from '@Redux/identities/actions'
import { AnyAction } from '@reduxjs/toolkit'

/** **********************************************************************
 * PROMISES
 */
export const identityFetcher = async (
  url = 'https://exercise-1-backend-dvdomulgfq-ew.a.run.app/user'
): Promise<Response | Error> => {
  let data
  try {
    const res: Response = await fetch(url)
    data = await res.json()
  } catch (e) {
    return e as Error
  }

  return data
}

type FetchIdentityCallEffect = CallEffect<Response | Error>
type FetchIdentityAllEffect = AllEffect<FetchIdentityCallEffect>
export type FetchIdentitiesGenerator = Generator<
  | SelectEffect
  | FetchIdentityCallEffect
  | FetchIdentityAllEffect
  | PutEffect<AnyAction>
  | Identity[]
>

/** **********************************************************************
 * SAGAS
 */
export function* fetchIdentities(calls = 1): FetchIdentitiesGenerator {
  yield put({
    type: FETCH_IDENTITIES_PENDING,
    payload: calls === 1 ? 'ADD_ONE' : 'ADD_MANY',
  })

  const apiCalls = new Array(calls).fill('')

  try {
    const pendingQueries = apiCalls.map<FetchIdentityCallEffect>(() =>
      call(identityFetcher)
    )
    const responses = yield all(pendingQueries)

    const identities = yield (responses as ApiResult[]).map(
      (identity): Identity => {
        const element = { ...identity, id: '' }
        element.id = Math.floor(Math.random() * 1000000).toString()
        return element
      }
    )

    yield put({
      type: FETCH_IDENTITIES_FULFILLED,
      payload: calls === 1 ? 'ADD_ONE' : 'ADD_MANY',
    })
    yield put({ type: ADD_IDENTITIES, payload: { identities } })
  } catch (e) {
    yield put({
      type: FETCH_IDENTITIES_FAILED,
      payload: {
        fetchActionType: calls === 1 ? 'ADD_ONE' : 'ADD_MANY',
        error: e,
      },
    })
  }
}
function* fetchFiveIdentities() {
  yield call(fetchIdentities, 5)
}

/** **********************************************************************
 * WATCHERS
 */
function* watchFetchIdentity() {
  while (true) {
    yield take(FETCH_IDENTITY)
    yield fork(fetchIdentities)
  }
}

function* watchFetchFiveIdentities() {
  while (true) {
    yield take(FETCH_IDENTITIES)
    yield fork(fetchFiveIdentities)
  }
}

/** **********************************************************************
 * REGISTERED
 */
export default function* rootSaga() {
  yield all([fork(watchFetchIdentity), fork(watchFetchFiveIdentities)])
}
