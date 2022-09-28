import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface desktopItem {
  id: number,
  x: number,
  y: number,
}

const initialState: desktopItem[] = [
  {id: 1, x: 100, y: 100},
  {id: 2, x: 400, y: 200},
  {id: 3, x: 500, y: 500},
]

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    moveItem: (state, action) => {
      const current = state.find(item => item.id === action.payload.id)
      if(current){
        current.x = action.payload.x
        current.y = action.payload.y
        state = state.filter(item => item.id === action.payload.id)
        state.push(current)
      }
    },
    addItem: (state, { payload }) => {
      const id = Math.max(...state.map(el => el.id)) + 1 //infinity если удалить все
      const newItem = {...payload, id}
      state.push(newItem)
    },
    deleteItem: (state, { payload }) => {
      return current(state).filter(el => el.id !== payload)
    }
  }
})

export const { moveItem, addItem, deleteItem } = itemsSlice.actions
export const getItems = (state: RootState) => state.items
export default itemsSlice.reducer

