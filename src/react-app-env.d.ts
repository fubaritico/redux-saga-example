/// <reference types="react-scripts" />
import * as React from 'react'
import { Action, ThunkAction } from '@reduxjs/toolkit'
import { store } from '@Redux/store'

export {}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare global {
  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
  >

  export type AppDispatch = typeof store.dispatch
  export type RootState = ReturnType<typeof store.getState>
}
