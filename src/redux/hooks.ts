import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
