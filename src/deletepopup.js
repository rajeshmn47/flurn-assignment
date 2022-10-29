import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import { useScrollTrigger } from "@mui/material";
import { useDispatch } from "react-redux";
import "./App.css";
import { deleteleave, getleaves } from "./actions/leaveActions";
// or

export const Popup = ({ deletepopupOpen, setDeletepopupOpen, deleteItem }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    setDeletepopupOpen(!deletepopupOpen);
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(deleteleave(deleteItem.id));
    dispatch(getleaves());
    setDeletepopupOpen(!deletepopupOpen);
  };
  return (
    <>
      <div className="popupdelete">
        <Dialog onClose={handleClose} open={deletepopupOpen}>
          <h3>Are you sure u want to delete this Item?</h3>
          <div className="popdelete">
            <div className="popup_left">
              <div>
                <button onClick={(e) => handlesubmit(e)}>yes</button>
              </div>
            </div>
            <div className="popup_right">
              <button onClick={() => handleClose()}>no</button>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default Popup;
