// src/reducers/DataReducer.js
import { createReducer } from "@reduxjs/toolkit";
import { 
  DATA_REQUEST, 
  DATA_SUCCESS, 
  DATA_FAILURE, 
  SELECT_DATA_REQUEST, 
  SELECT_DATA_SUCCESS, 
  SELECT_DATA_FAILURE 
} from '../Actions/DataAction'; // Assuming you have the actions defined elsewhere

export const DataReducer = createReducer(
  { loading: false, allTickets: [], allUser: [] }, // initial state
  (builder) => {
    builder
      .addCase(DATA_REQUEST, (state) => {
        state.loading = true;
      })
      .addCase(DATA_SUCCESS, (state, action) => {
        state.loading = false;
        state.allTickets = action.payload.tickets;
        state.allUser = action.payload.users;
      })
      .addCase(DATA_FAILURE, (state) => {
        state.loading = false;
        state.allTickets = [];
        state.allUser = [];
      });
  }
);

export const SelectDataReducer = createReducer(
  { loading: false, selectedData: [], message: '', user: null }, // initial state
  (builder) => {
    builder
      .addCase(SELECT_DATA_REQUEST, (state) => {
        state.loading = true;
        state.selectedData = [];
      })
      .addCase(SELECT_DATA_SUCCESS, (state, action) => {
        state.loading = false;
        state.selectedData = action.payload.selectedData;
        state.user = action.payload.user;
      })
      .addCase(SELECT_DATA_FAILURE, (state, action) => {
        state.loading = false;
        state.selectedData = [];
        state.message = action.payload.message;
      });
  }
);
