import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import { useScrollTrigger } from "@mui/material";
import { React, useEffect } from "react";
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
import { editleave, getleaves } from "./actions/leaveActions";
import { getElRoot } from "fullcalendar";
// or

export const Popup = ({ editpopupOpen, setEditpopupOpen, editItem ,setNotification }) => {
  console.log(editpopupOpen, editItem, setEditpopupOpen, "edititem");
  const dispatch = useDispatch();
  const [tovalue, setToValue] = useState(dayjs());
  const [fromvalue, setFromValue] = useState(dayjs());
  const [reason, setReason] = useState("");
  useEffect(() => {
    if (editItem) {
      setToValue(editItem?.from_date);
      setFromValue(editItem?.to_date);
      setReason(editItem?.reason);
    }
  }, [editItem]);
  const handlechange = (e) => {
    setReason(e.target.value);
  };
  const handleClose = () => {
    setEditpopupOpen(!editpopupOpen);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const myform = {
      id: editItem.id,
      start_date: fromvalue,
      end_date: tovalue,
      reason: reason,
    };
    setReason("");
    dispatch(editleave(myform));
    dispatch(getleaves());
    setNotification({open:true,message:'edited successfully'})
    setEditpopupOpen(false);
  };
  return (
    <>
      <div className="popup">
        <Dialog onClose={handleClose} open={editpopupOpen}>
          <div className="popp">
            <div className="popup_left">
              <div></div>
            </div>
            <div className="popup_right">
              <h2>User information</h2>
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
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default Popup;
