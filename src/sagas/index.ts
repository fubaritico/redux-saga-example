import { all, call, put, fork, select, take, AllEffect, CallEffect, PutEffect, SelectEffect } from 'redux-saga/effects'
import axios, {AxiosResponse} from "axios";
import {
    ADD_IDENTITIES,
    FETCH_IDENTITIES, FETCH_IDENTITIES_FAILED,
    FETCH_IDENTITIES_FULFILLED,
    FETCH_IDENTITIES_PENDING,
    FETCH_IDENTITY
} from "@Redux/identities/actions";
import {getListMode} from "@Redux/identities/selectors";
import {AnyAction} from "@reduxjs/toolkit";

/** **********************************************************************
 * PROMISES
 */
const identityFetcher = () => axios.get('https://exercise-1-backend-dvdomulgfq-ew.a.run.app/user')

type FetchIdentityCallEffect = CallEffect<AxiosResponse>
type FetchIdentityAllEffect = AllEffect<FetchIdentityCallEffect>
export type FetchIdentitiesGenerator = Generator<SelectEffect | FetchIdentityCallEffect | FetchIdentityAllEffect| PutEffect<AnyAction>>

/** **********************************************************************
 * SAGAS
 */
export function *fetchIdentities (calls = 1): FetchIdentitiesGenerator {
    yield put({ type: FETCH_IDENTITIES_PENDING , payload: calls === 1 ? 'ADD_ONE' : 'ADD_MANY'})
    console.log('fetchIdentities')
    const listMode = yield select(getListMode)
    console.log('fetchIdentities - listMode:', listMode)
    const apiCalls = new Array(calls).fill('')

    try {
        const pendingQueries = apiCalls.map<FetchIdentityCallEffect>( () => call( identityFetcher ))
        const responses = yield all(pendingQueries)

        const identities = (responses as AxiosResponse[]).map((response) => {
            const identity = response.data
            identity.id = Math.floor(Math.random() * 1000000)
            return identity
        })

        yield put({ type: FETCH_IDENTITIES_FULFILLED , payload: calls === 1 ? 'ADD_ONE' : 'ADD_MANY'})
        yield put({ type: ADD_IDENTITIES , payload: { identities }})
    } catch(e) {
        yield put({ type: FETCH_IDENTITIES_FAILED , payload: calls === 1 ? 'ADD_ONE' : 'ADD_MANY'})
    }

}
function *fetchFiveIdentities () {
    yield call(fetchIdentities, 5)
}

/** **********************************************************************
 * WATCHERS
 */
function *watchFetchIdentity () {
    while(true) {
        yield take(FETCH_IDENTITY)
        yield fork(fetchIdentities)
    }
}

function *watchFetchFiveIdentities () {
    while(true) {
        yield take(FETCH_IDENTITIES)
        yield fork(fetchFiveIdentities)
    }
}

/** **********************************************************************
 * REGISTERED
 */
export default function* rootSaga() {
    yield all([
        fork(watchFetchIdentity),
        fork(watchFetchFiveIdentities),
    ])
}