import { generateTableInfos } from "@/lib/helpers";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { 
  loading: false,
  addedLink: {},
  editedLink: {},
  deletedLink: {},
  linkList: []
};
export const getTableInfos = createAsyncThunk("table/getLinks", async (tableCount:number) => {
  const response = generateTableInfos(tableCount)
  return response;
});


const tableLinkSlice = createSlice({
  name: "tables",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //list tableLinks
      .addCase(getTableInfos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTableInfos.fulfilled, (state, {payload}) => {
        state.loading = false;
        // state.linkList.push(payload);
      })
      .addCase(getTableInfos.rejected, (state) => {
        state.loading = false;
      })
  }
});

export default tableLinkSlice.reducer;
