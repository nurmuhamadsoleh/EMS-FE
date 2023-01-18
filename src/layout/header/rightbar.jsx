import React, { Fragment, useState, useEffect } from "react";
import man from "../../assets/images/dashboard/profile.jpg";
// import UserProfile from "../../assets/images/user/user.png";
import { LogIn, User, Bell, Maximize } from "react-feather";
import { useNavigate } from "react-router-dom";
import { firebase_app } from "../../data/config";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import {
  Notification,
  DeliveryProcessing,
  OrderComplete,
  TicketsGenerated,
  DeliveryComplete,
  CheckAllNotification,
  Admin,
  Account,
  LogOut,
} from "../../constant";
import { classes } from "../../data/layouts";

const Rightbar = () => {
  const history = useNavigate();
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [moonlight, setMoonlight] = useState(false);
  const [notificationDropDown, setNotificationDropDown] = useState(false);
  // const [chatDropDown, setChatDropDown] = useState(false);

  // const { logout } = useAuth0();
  // const authenticated = JSON.parse(localStorage.getItem("authenticated"));
  // const auth0_profile = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    setProfile(localStorage.getItem("profile"));
    // setName(localStorage.getItem("Name"));
    if (localStorage.getItem("layout_version") === "dark-only") {
      setMoonlight(true);
    }
  }, []);

  // const Logout_From_Firebase = () => {
  //   localStorage.removeItem("profileURL");
  //   localStorage.removeItem("token");
  //   firebase_app.auth().signOut();
  //   history(`${process.env.PUBLIC_URL}/login`);
  // };

  const Logout_From_Auth0 = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return (window.location.href = `${process.env.PUBLIC_URL}`);
  };
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  // const RedirectToChats = () => {
  //   history(`${process.env.PUBLIC_URL}/app/users/userProfile/${layout}`);
  // };
  // const RedirectToChat = () => {
  //   history(`${process.env.PUBLIC_URL}/app/chat-app/${layout}`);
  // };

  const UserMenuRedirect = (redirect) => {
    history(redirect);
  };

  //full screen function
  function goFull() {
    if (
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  const MoonlightToggle = (light) => {
    if (light) {
      setMoonlight(!light);
      document.body.classList.add("light");
      document.body.classList.remove("dark-only");
      // document.body.className = "light"
      localStorage.setItem("layout_version", "light");
    } else {
      setMoonlight(!light);
      document.body.classList.remove("light");
      document.body.classList.add("dark-only");
      localStorage.setItem("layout_version", "dark-only");
    }
  };

  return (
    <Fragment>
      <div className="nav-right col-8 pull-right right-header p-0">
        <ul className="nav-menus">
          <li className="onhover-dropdown">
            <div
              className="notification-box"
              onClick={() => setNotificationDropDown(!notificationDropDown)}
            >
              <Bell />
              <span className="badge rounded-pill badge-secondary">2</span>
            </div>
            <div
              className={`notification-dropdown onhover-show-div ${
                notificationDropDown ? "active" : ""
              }`}
            >
              <h6 className="f-18 mb-0 dropdown-title">{Notification}</h6>
              <ul>
                <li className="b-l-primary border-4">
                  <p>
                    {DeliveryProcessing}
                    <span className="font-danger">{"10 min."}</span>
                  </p>
                </li>
                <li className="b-l-success border-4">
                  <p>
                    {OrderComplete}
                    <span className="font-success">{"1 hr"}</span>
                  </p>
                </li>
                <li className="b-l-info border-4">
                  <p>
                    {TicketsGenerated}
                    <span className="font-info">{"3 hr"}</span>
                  </p>
                </li>
                <li className="b-l-warning border-4">
                  <p>
                    {DeliveryComplete}
                    <span className="font-warning">{"6 hr"}</span>
                  </p>
                </li>
                <li>
                  <Link
                    className="font-primary f-w-700"
                    to={`${process.env.PUBLIC_URL}/app/ecommerce/orderhistory/${layout}`}
                  >
                    {CheckAllNotification}
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div className="mode" onClick={() => MoonlightToggle(moonlight)}>
              {moonlight ? (
                <i className="fa fa-lightbulb-o"></i>
              ) : (
                <i className="fa fa-moon-o"></i>
              )}
            </div>
          </li>
          <li className="maximize">
            <a className="text-dark" href="#javascript" onClick={goFull}>
              <Maximize />
            </a>
          </li>
          <li className="profile-nav onhover-dropdown p-0">
            <div className="media profile-media">
              {/* Profile */}
              {/* <img
                className="b-r-10"
                src={auth0_profile}
                alt=""
              /> */}
              <div className="media-body">
                <span>{profile}</span>
                {/* <p className="mb-0 font-roboto">
                  {Admin} <i className="middle fa fa-angle-down"></i>
                </p> */}
              </div>
            </div>
            <ul className="profile-dropdown onhover-show-div">
              <li
                onClick={() =>
                  UserMenuRedirect(
                    `${process.env.PUBLIC_URL}/resetpass/${layout}`
                  )
                }
              >
                <User />
                <span>{Account} </span>
              </li>
              <li onClick={Logout_From_Auth0}>
                <LogIn />
                <span>{LogOut}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};
// export default translate(Rightbar);
export default Rightbar;
