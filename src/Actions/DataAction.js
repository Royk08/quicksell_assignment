// kanban-board/src/Actions/DataAction.js

import axios from "axios";

// Define action types as constants
export const DATA_REQUEST = "DATA_REQUEST";
export const DATA_SUCCESS = "DATA_SUCCESS";
export const DATA_FAILURE = "DATA_FAILURE";
export const SELECT_DATA_REQUEST = "SELECT_DATA_REQUEST";
export const SELECT_DATA_SUCCESS = "SELECT_DATA_SUCCESS";
export const SELECT_DATA_FAILURE = "SELECT_DATA_FAILURE";

// Action creators for fetching all data
export const fetchAllData = () => async (dispatch) => {
  try {
    dispatch({ type: DATA_REQUEST });
    const { data } = await axios.get(
      "https://api.quicksell.co/v1/internal/frontend-assignment/"
    );
    dispatch({ type: DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DATA_FAILURE });
  }
};

// Action creator for selecting data based on a group (status, user, or priority)
export const selectData = (group, allTickets, orderValue) => async (dispatch) => {
  try {
    dispatch({ type: SELECT_DATA_REQUEST });
    let user = false;
    let mySet = new Set();
    let arr = [], selectedData = [];
    if (group === "status") {
      allTickets.forEach((element) => {
        mySet.add(element.status);
      });
      arr = [...mySet];
      arr.forEach((element, index) => {
        let arr = allTickets.filter((fElement) => {
          return element === fElement.status;
        });
        selectedData.push({
          [index]: {
            title: element,
            value: arr,
          },
        });
      });
    } else if (group === "user") {
      user = true;
      allTickets?.allUser?.forEach((element, index) => {
        arr = allTickets?.allTickets?.filter((Felement) => {
          return element.id === Felement.userId;
        });
        selectedData.push({
          [index]: {
            title: element.name,
            value: arr,
          },
        });
      });
    } else {
      let prior_list = ["No priority", "Urgent", "High", "Medium", "Low"];
      prior_list.forEach((element, index) => {
        arr = allTickets.filter((fElement) => {
          return index === fElement.priority;
        });
        selectedData.push({
          [index]: {
            title: element,
            value: arr,
          },
        });
      });
    }

    // Sorting data if necessary
    if (orderValue === "title") {
      selectedData.forEach((element, index) => {
        element[index]?.value?.sort((a, b) => a.title.localeCompare(b.title));
      });
    }
    if (orderValue === "priority") {
      selectedData.forEach((element, index) => {
        element[index]?.value?.sort((a, b) => b.priority - a.priority);
      });
    }

    dispatch({ type: SELECT_DATA_SUCCESS, payload: { selectedData, user } });
  } catch (error) {
    dispatch({ type: SELECT_DATA_FAILURE, payload: error.message });
  }
};
