import { useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./actions/userAction";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const dispatch = useDispatch();
  const router = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );

  const handlelogout = () => {
    dispatch(logout());
    router("/");
  };
  console.log(location.pathname, "path");
  return (
    <div className="sidebar">
      <div>
        <li className="title">My Calendar</li>
        <button
          className={location.pathname === "/list" ? "selected" : "navitem"}
          onClick={() => router("/list")}
        >
          Leave list
        </button>
        <button
          className={location.pathname === "/create" ? "selected" : "navitem"}
          onClick={() => router("/create")}
        >
          create leave form
        </button>
        <button
          className={location.pathname === "/calender" ? "selected" : "navitem"}
          onClick={() => router("/calender")}
        >
          Calender view
        </button>
      </div>
      <div className="auth" onClick={handlelogout}>
        {user?.email && user.email}
        <LogoutIcon style={{ marginLeft: "5px" }} />
      </div>
    </div>
  );
}

export default SideBar;
