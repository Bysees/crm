import { ICall } from 'types/Call';
import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit/dist"
import { fetchCallList } from '../thunks/callList';
import { callsFiltersActions, callsFiltersReducer } from './filters';

const setAllCheckedIds = (state: InitialState) => {
  state.checkedIds = state.initialList.map(item => item.id)
}

const removeAllCheckedIds = (state: InitialState) => {
  state.checkedIds = []
}

const setCheckedId = (state: InitialState, action: PayloadAction<ICall['id']>) => {
  state.checkedIds.push(action.payload)
}

const removeCheckedId = (state: InitialState, action: PayloadAction<ICall['id']>) => {
  const index = state.checkedIds.findIndex(id => id === action.payload)
  state.checkedIds.splice(index, 1)
}


type InitialState = {
  initialList: ICall[]
  status: 'init' | 'loading' | 'success' | 'error'
  error: string | null
  checkedIds: ICall['id'][]
}

const initialState: InitialState = {
  initialList: [],
  status: 'loading',
  error: null,
  checkedIds: []
}

const callsSlice = createSlice({
  name: 'calls',
  initialState,
  reducers: {
    toogleAllCheckedIds: (state) => {
      //! FIXME Работает не правильно, переделать.
      const isAllIdsChecked = state.checkedIds.length === state.initialList.length

      if (isAllIdsChecked) {
        removeAllCheckedIds(state)
        return
      }

      setAllCheckedIds(state)
    },

    toogleCheckedId: (state, action: PayloadAction<ICall['id']>) => {
      const isChekedId = state.checkedIds.includes(action.payload)

      if (isChekedId) {
        removeCheckedId(state, action)
        return
      }

      setCheckedId(state, action)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCallList.fulfilled, (state, { payload }) => {
      state.initialList = payload
      state.status = 'success'
    })
    builder.addCase(fetchCallList.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchCallList.rejected, (state, { payload, error }) => {
      if (payload) {
        state.error = payload
      } else {
        state.error = error.message!
      }
      state.status = 'error'
    })
  }
})



const callsActions = callsSlice.actions
const callsReducer = combineReducers({ items: callsSlice.reducer, filter: callsFiltersReducer });

export { callsReducer, callsActions, callsFiltersActions }
