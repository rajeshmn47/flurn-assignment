import axios from "axios";
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_FAIL,
  CREATE_LEAVE_REQUEST,
  CREATE_LEAVE_SUCCESS,
  CREATE_LEAVE_FAIL,
  LEAVE_LIST_SUCCESS,
  LEAVE_LIST_REQUEST,
  LEAVE_LIST_FAIL,
} from "../constants/userConstant";

const headers = {
  Accept: "application/json",
  apikey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZ2ljZ2d1cG5yeGxkd3ZrZWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYwMDI4ODMsImV4cCI6MTk4MTU3ODg4M30.BLLinQ9VEK8_T-JE22WOidlJs_0TFhOb1n3zkSVc7eg",
};
export const createleave = (myform) => async (dispatch) => {
  try {
    console.log(myform, "createleave");
    const access_token =
      localStorage.getItem("access_token") &&
      localStorage.getItem("access_token");
    const data = await axios({
      method: "POST",
      url: "https://dkgicggupnrxldwvkeft.supabase.co/rest/v1/leaves",
      data: myform,
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(data);
    if (data.user) {
      console.log("true rajesh");
      dispatch({ type: CREATE_LEAVE_SUCCESS, payload: "data" });
    }
  } catch (error) {
    console.log(error.response, "asdfgh");
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getleaves = (myform) => async (dispatch) => {
  try {
    console.log(myform);
    const access_token =
      localStorage.getItem("access_token") &&
      localStorage.getItem("access_token");
    const data = await axios({
      method: "get",
      url: "https://dkgicggupnrxldwvkeft.supabase.co/rest/v1/leaves?select=*",
      data: myform,
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(data);
    dispatch({ type: LEAVE_LIST_SUCCESS, payload: data.data });
  } catch (error) {
    console.log(error.response, "asdfgh");
    dispatch({
      type: LEAVE_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const editleave = (myform) => async (dispatch) => {
  try {
    console.log(myform, "editaction");
    const access_token =
      localStorage.getItem("access_token") &&
      localStorage.getItem("access_token");
    const data = await axios({
      method: "patch",
      url: `https://dkgicggupnrxldwvkeft.supabase.co/rest/v1/leaves?id=eq.${myform.id}`,
      data: {
        reason: myform.reason,
        start_date: myform.start_date,
        end_date: myform.end_date,
      },
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log("true rajesh");
    dispatch(getleaves());
    dispatch({ type: CREATE_LEAVE_SUCCESS, payload: true });
  } catch (error) {
    console.log(error.response, "asdfgh");
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteleave = (id) => async (dispatch) => {
  try {
    console.log(id, "editaction");
    const access_token =
      localStorage.getItem("access_token") &&
      localStorage.getItem("access_token");
    const data = await axios({
      method: "delete",
      url: `https://dkgicggupnrxldwvkeft.supabase.co/rest/v1/leaves?id=eq.${id}`,
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(data);
    if (data.user) {
      console.log("true rajesh");
      dispatch({ type: CREATE_LEAVE_SUCCESS, payload: "data" });
    }
  } catch (error) {
    console.log(error.response, "asdfgh");
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
