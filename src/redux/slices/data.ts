import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Group {
  _id: string;
  name: string;
  createdBy: {
    name: string;
    _id: string;
  };
  members: string[];
  createdAt: string;
  count: number;
  status: string;
  __v: number;
}

interface TryYourselfState {
  count: number;
  numbers: string[];
}

const initialState: { tryYourself: TryYourselfState, groups: Group[] | null, myGroups: Group[] | null, codes: { index?: number, code?: string, _id?: string }[] } = {
  tryYourself: {
    count: 0,
    numbers: [],
  },
  myGroups: null,
  groups: null,
  codes: []
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addTryYourself: (state, action: PayloadAction<string>) => {
      state.tryYourself.numbers.push(action.payload)
      state.tryYourself.count = state.tryYourself.count + 1
    },
    setGroups: (state, { payload }) => {
      state.groups = payload
    },
    setMyGroups: (state, { payload }) => {
      state.myGroups = payload
    },
    addMyGroups: (state, { payload }) => {
      payload[0].createdBy = { name: payload[1] }
      if (state.myGroups) {
        state.myGroups.push(payload[0])
      } else {
        state.myGroups = [payload[0]]
      }
    },
    setCodes: (state, { payload }) => {
      state.codes = payload
    }
  }
})

export const { addTryYourself, setGroups, setMyGroups, setCodes, addMyGroups } = dataSlice.actions
export default dataSlice.reducer