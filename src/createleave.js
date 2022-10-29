import { React, useEffect } from "react";
import { useState } from "react";
import "./App.css";
import styled from "@emotion/styled";

import dayjs from "dayjs";
import "dayjs/locale/ko";
import "dayjs/locale/fr";
import "dayjs/locale/de";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { TextField, Button, Grid } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import { createleave } from "./actions/leaveActions";

const locales = ["ko", "fr", "de"];

function CreateLeave() {
  const dispatch = useDispatch();
  const [tovalue, setToValue] = useState(dayjs());
  const [fromvalue, setFromValue] = useState(dayjs());
  const [reason, setReason] = useState("");

  const handleToChange = (newValue) => {
    setToValue(newValue);
  };

  const handleFromChange = (newValue) => {
    setFromValue(newValue);
  };

  const handlechange = (e) => {
    setReason(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const myform = { start_date: fromvalue, end_date: tovalue, reason: reason };
    setReason("");
    dispatch(createleave(myform));
  };
  const Dox = styled.div``;

  const Box1 = styled.div`
    width: 500px;
    height: 300px;
    margin: 60px auto;
    padding: 20px;
    background: #f2f2f2;
    border-radius: 10px;
    text-align: center;
  `;

  return (
    <>
      <h3 style={{ textAlign: "center" }}>Request for Leave of Absence Form</h3>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item lg={12}>
              <LocalizationProvider
                sx={{ width: "100%" }}
                dateAdapter={AdapterDayjs}
              >
                <DatePicker
                  sx={{ width: "100%" }}
                  label="From"
                  value={fromvalue}
                  onChange={(newValue) => {
                    setFromValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} sx={{ width: "100%" }} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item lg={12}>
              <LocalizationProvider
                sx={{ width: "100%" }}
                dateAdapter={AdapterDayjs}
              >
                <DatePicker
                  sx={{ width: "100%" }}
                  label="To"
                  value={tovalue}
                  onChange={(newValue) => {
                    setToValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} sx={{ width: "100%" }} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item lg={12}>
              <TextField
                placeholder="reason"
                sx={{ width: "100%" }}
                value={reason}
                onChange={handlechange}
              />
            </Grid>
            <Grid item lg={12}>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "blue",
                  color: "#ffffff",
                }}
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}

export default CreateLeave;
