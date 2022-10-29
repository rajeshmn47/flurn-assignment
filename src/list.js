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
import { getleaves } from "./actions/leaveActions";
import EditOutlineIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import EditPopup from "./editpopup";
import DeletePopup from "./deletepopup";

const locales = ["ko", "fr", "de"];

function List() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading, leavelist, isCreated } = useSelector((state) => state.leave);
  const { user, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  
  console.log(leavelist, "leave");
  const today = new Date();
  const todayDate = today.getFullYear() - today.getMonth() - today.getDate();
  const [tovalue, setToValue] = useState(dayjs());
  const [fromvalue, setFromValue] = useState(dayjs());
  const [reason, setReason] = useState("");
  const [editpopupOpen, setEditpopupOpen] = useState(false);
  const [editItem, setEditItem] = useState();
  const [deletepopupOpen, setDeletepopupOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  useEffect(() => {
    dispatch(getleaves());
  }, [dispatch, isCreated]);

  useEffect(()=>{
  if(!isAuthenticated){
    console.log(isAuthenticated)
  navigate('/')
  }
  },[dispatch,isAuthenticated])

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
  const handleEditItem = (id) => {
    console.log(id);
    setEditItem(leavelist.find((f) => f.id === id));
    setEditpopupOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteItem(leavelist.find((f) => f.id === id));
    setDeletepopupOpen(true);
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
  const upcoming = (d) => {};
  console.log(
    leavelist?.filter((f) => new Date(todayDate) < new Date(f.start_date))
  );
  return (
    <>
      <div className="tablecontainer">
        <h3>Upcoming Leaves</h3>
        <table>
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {leavelist
              ?.filter((f) => new Date(todayDate) < new Date(f.start_date))
              .map((l) => (
                <>
                  <tr>
                    <td>{l.start_date}</td>
                    <td>{l.end_date}</td>
                    <td>{l.reason}</td>
                    <td>
                      <EditOutlineIcon
                        style={{ cursor: "pointer", color: "lightgrey" }}
                        onClick={() => handleEditItem(l.id)}
                      />
                      <DeleteOutlineIcon
                        style={{
                          cursor: "pointer",
                          color: "red",
                          marginLeft: "10px",
                        }}
                        onClick={() => handleDelete(l.id)}
                      />
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
      <div className="tablecontainer two">
        <h3>Past Leaves</h3>
        <table>
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {leavelist
              ?.filter((f) => new Date(todayDate) > new Date(f.start_date))
              .map((l) => (
                <>
                  <tr key={l._id}>
                    <td>{l.start_date}</td>
                    <td>{l.end_date}</td>
                    <td>{l.reason}</td>
                    <td>
                      <EditOutlineIcon
                        style={{ cursor: "pointer" }}
                        onClick={(l) => handleEditItem(l._id)}
                      />
                      <DeleteOutlineIcon
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={(l) => handleDelete(l._id)}
                      />
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
        <EditPopup
          editpopupOpen={editpopupOpen}
          setEditpopupOpen={setEditpopupOpen}
          editItem={editItem}
        />
        <DeletePopup
          deletepopupOpen={deletepopupOpen}
          setDeletepopupOpen={setDeletepopupOpen}
          deleteItem={deleteItem}
        />
      </div>
    </>
  );
}

export default List;
