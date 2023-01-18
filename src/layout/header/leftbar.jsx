import React, { Fragment, useState, useLayoutEffect, useEffect } from "react";
import { Col } from "reactstrap";
import UserImage from "../../assets/images/user/pms.jpeg";
import { Layers, AlignCenter } from "react-feather";
import { Link } from "react-router-dom";
import { BonusUi } from "../../constant";
import { DefaultLayout } from "../theme-customizer";

const Leftbar = (props) => {
  const id = window.location.pathname.split("/").pop();
  const defaultLayout = Object.keys(DefaultLayout);
  const layout = id ? id : defaultLayout;
  const [bonusui, setBonusUI] = useState(false);
  const [levelMenu, setLevelMenu] = useState(false);
  const [sidebartoggle, setSidebartoggle] = useState(true);
  const width = useWindowSize();

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize(window.innerWidth);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  useEffect(() => {
    var ignoreClick_On_Out_side_Element =
      document.getElementById("out_side_click");
    var ignoreClick_On_Main_Nav_Element =
      document.getElementById("sidebar-menu");
    document.addEventListener("click", function (event) {
      var isClickOutSideElement = ignoreClick_On_Out_side_Element.contains(
        event.target
      );
      var isClickMainNavElement = ignoreClick_On_Main_Nav_Element.contains(
        event.target
      );
      if (
        window.innerWidth <= 991 &&
        !isClickOutSideElement &&
        !isClickMainNavElement &&
        document.getElementById("sidebar-wrapper")
      ) {
        //Do something click is outside specified element
        document.querySelector(".page-header").className =
          "page-header close_icon";
        document.querySelector(".sidebar-wrapper").className =
          "sidebar-wrapper close_icon ";
      }
    });
  }, [width]);

  // const responsiveMegaMenuclose = () => {
  //   setBonusUI(false);
  //   document.querySelector(".mega-menu-container").classList.remove("d-block");
  // };

  const ToggleBonusUI = (value) => {
    setLevelMenu(false);
    if (value) {
      setBonusUI(!value);
      document
        .querySelector(".mega-menu-container")
        .classList.remove("d-block");
    } else {
      setBonusUI(!value);
      if (width <= 991) {
        document.querySelector(".page-header").className =
          "page-header close_icon";
        document.querySelector(".sidebar-wrapper").className =
          "sidebar-wrapper close_icon ";
        document.querySelector(".mega-menu-container").classList.add("d-block");
      } else {
        document.querySelector(".mega-menu-container").classList.add("d-block");
      }
    }
  };

  const responsive_openCloseSidebar = (toggle) => {
    if (width <= 991) {
      setBonusUI(false);
      document.querySelector(".page-header").className = "page-header";
      document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper ";
    } else {
      if (toggle) {
        setSidebartoggle(!toggle);
        document.querySelector(".page-header").className =
          "page-header close_icon";
        document.querySelector(".sidebar-wrapper").className =
          "sidebar-wrapper close_icon ";
        document
          .querySelector(".mega-menu-container")
          .classList.remove("d-block");
      } else {
        setSidebartoggle(!toggle);
        document.querySelector(".page-header").className = "page-header";
        document.querySelector(".sidebar-wrapper").className =
          "sidebar-wrapper ";
      }
    }
  };

  // const OnLevelMenu = (menu) => {
  //   setBonusUI(false);
  //   document.querySelector(".mega-menu-container").classList.remove("d-block");
  //   setLevelMenu(!menu);
  // };

  return (
    <Fragment>
      <div className="header-logo-wrapper col-auto p-0" id="out_side_click">
        <div className="logo-wrapper">
          {/* <Link to={`${process.env.PUBLIC_URL}/dashboard/MENUITEMS/${layout}`}>
            <img className="img-fluid for-light" src={UserImage} alt="" />
            <img className="img-fluid for-dark" src={UserImage} alt="" />
          </Link> */}
        </div>
        <div
          className="toggle-sidebar"
          onClick={() => responsive_openCloseSidebar(sidebartoggle)}
          style={
            window.innerWidth <= 991
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <AlignCenter
            className="status_toggle middle sidebar-toggle"
            id="sidebar-toggle"
          />
        </div>
      </div>
      {/* <Col className="left-header horizontal-wrapper ps-0">
        <ul className="horizontal-menu">
          <li className="mega-menu outside">
            <Link
              className={`nav-link ${bonusui ? "active" : ""}`}
              to={`${process.env.PUBLIC_URL}/dashboard/metersbygroup/${layout}`}
              onClick={() => ToggleBonusUI(bonusui)}
            >
              <Layers />
              <span>{BonusUi}</span>
            </Link>
            <div
              className="mega-menu-container nav-submenu menu-to-be-close"
              style={bonusui ? { display: "" } : { display: "none" }}
            ></div>
          </li>
        </ul>
      </Col> */}
    </Fragment>
  );
};

export default Leftbar;
