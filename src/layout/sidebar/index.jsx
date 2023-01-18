import React, { Fragment, useState, useEffect } from "react";
import UserProfile from "../../assets/images/user/pms.jpeg";
import { useSelector } from "react-redux";
import { MENUITEMS } from "./menu";
import { ArrowRight, ArrowLeft, Grid } from "react-feather";
import { Link } from "react-router-dom";
import configDB from "../../data/customizer/config";
import { DefaultLayout } from "../theme-customizer";
// import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const id = window.location.pathname.split("/").pop();
  // token
  let token = localStorage.getItem("token");
  const defaultLayout = Object.keys(DefaultLayout);
  const layout = id ? id : defaultLayout;
  const [mainmenu, setMainMenu] = useState(MENUITEMS);
  const [margin, setMargin] = useState(0);
  const [width, setWidth] = useState(0);
  // const { t } = useTranslation();
  const [sidebartoogle, setSidebartoogle] = useState(true);
  const wrapper =
    useSelector((content) => content.Customizer.sidebar_types.type) ||
    configDB.data.settings.sidebar.type;
  const handleScroll = () => {
    if (window.scrollY > 400) {
      if (
        configDB.data.settings.sidebar.type.split(" ").pop() ===
          "material-type" ||
        configDB.data.settings.sidebar.type.split(" ").pop() ===
          "advance-layout"
      )
        document.querySelector(".sidebar-main").className =
          "sidebar-main hovered";
    } else {
      if (document.getElementById("sidebar-main"))
        document.querySelector(".sidebar-main").className = "sidebar-main";
    }
  };
  useEffect(() => {
    document.querySelector(".left-arrow").classList.add("d-none");

    window.addEventListener("resize", handleResize);
    handleResize();
    const currentUrl = window.location.pathname;
    MENUITEMS.map((items) => {
      items.Items.filter((Items) => {
        if (Items.path === currentUrl) setNavActive(Items);
        if (!Items.children) return false;
        Items.children.filter((subItems) => {
          if (subItems.path === currentUrl) setNavActive(subItems);
          if (!subItems.children) return false;
          subItems.children.filter((subSubItems) => {
            if (subSubItems.path === currentUrl) {
              setNavActive(subSubItems);
              return true;
            } else {
              return false;
            }
          });
          return subItems;
        });
        return Items;
      });
      return items;
    });
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [layout, mainmenu]);

  const handleResize = () => {
    setWidth(window.innerWidth - 500);
  };

  const setNavActive = (item) => {
    MENUITEMS.map((menuItems) => {
      menuItems.Items.filter((Items) => {
        if (Items !== item) {
          Items.active = false;
          document.querySelector(".bg-overlay1").classList.remove("active");
        }
        if (Items.children && Items.children.includes(item)) {
          Items.active = true;
          document.querySelector(".sidebar-link").classList.add("active");
        }
        if (Items.children) {
          Items.children.filter((submenuItems) => {
            if (submenuItems.children && submenuItems.children.includes(item)) {
              Items.active = true;
              submenuItems.active = true;
              return true;
            } else {
              return false;
            }
          });
        }
        return Items;
      });
      return menuItems;
    });
    item.active = !item.active;
    setMainMenu({ mainmenu: MENUITEMS });
  };

  const toggletNavActive = (item) => {
    if (window.innerWidth <= 991) {
      document.querySelector(".page-header").className =
        "page-header close_icon";
      document.querySelector(".sidebar-wrapper").className =
        "sidebar-wrapper close_icon ";
      document
        .querySelector(".mega-menu-container")
        .classList.remove("d-block");
      if (item.type === "sub") {
        document.querySelector(".page-header").className = "page-header ";
        document.querySelector(".sidebar-wrapper").className =
          "sidebar-wrapper ";
      }
    }

    if (!item.active) {
      MENUITEMS.map((a) => {
        a.Items.filter((Items) => {
          if (a.Items.includes(item)) Items.active = false;
          if (!Items.children) return false;
          Items.children.forEach((b) => {
            if (Items.children.includes(item)) {
              b.active = false;
            }
            if (!b.children) return false;
            b.children.forEach((c) => {
              if (b.children.includes(item)) {
                c.active = false;
              }
            });
          });
          return Items;
        });
        return a;
      });
    }

    item.active = !item.active;
    setMainMenu({ mainmenu: MENUITEMS });
  };

  const scrollToRight = () => {
    if (margin <= -2598 || margin <= -2034) {
      if (width === 492) {
        setMargin(-3570);
      } else {
        setMargin(-3464);
      }
      document.querySelector(".right-arrow").classList.add("d-none");
      document.querySelector(".left-arrow").classList.remove("d-none");
    } else {
      setMargin((margin) => (margin += -width));
      document.querySelector(".left-arrow").classList.remove("d-none");
    }
  };

  const scrollToLeft = () => {
    if (margin >= -width) {
      setMargin(0);
      document.querySelector(".left-arrow").classList.add("d-none");
      document.querySelector(".right-arrow").classList.remove("d-none");
    } else {
      setMargin((margin) => (margin += width));
      document.querySelector(".right-arrow").classList.remove("d-none");
    }
  };

  const closeOverlay = () => {
    document.querySelector(".bg-overlay1").classList.remove("active");
    document.querySelector(".sidebar-link").classList.remove("active");
  };

  const activeClass = (menuActiveClass) => {
    if (menuActiveClass === true) {
      document.querySelector(".sidebar-link").classList.add("active");
      document.querySelector(".bg-overlay1").classList.add("active");
    } else {
      document.querySelector(".sidebar-link").classList.remove("active");
      document.querySelector(".bg-overlay1").classList.remove("active");
    }
  };

  const openCloseSidebar = (toggle) => {
    if (toggle) {
      setSidebartoogle(!toggle);
      document.querySelector(".page-header").className =
        "page-header close_icon";
      document.querySelector(".sidebar-wrapper").className =
        "sidebar-wrapper close_icon ";
    } else {
      setSidebartoogle(!toggle);
      document.querySelector(".page-header").className = "page-header";
      document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper ";
    }
  };

  const responsiveSidebar = () => {
    document.querySelector(".page-header").className = "page-header close_icon";
    document.querySelector(".sidebar-wrapper").className =
      "sidebar-wrapper close_icon";
  };

  return (
    <Fragment>
      <div
        className={`bg-overlay1`}
        onClick={() => {
          closeOverlay();
        }}
      ></div>
      <>
        <div className="sidebar-wrapper" id="sidebar-wrapper">
          <div className="logo-wrapper mb-0 pb-0">
            <Link
              to={`${process.env.PUBLIC_URL}/dashboard/metersbygroup/${layout}`}
            >
              <div className="d-flex justify-content-center align-items-center">
                <img
                  className="img-fluid for-light w-25"
                  src={UserProfile}
                  alt="EMS"
                />
                <img
                  className="img-fluid for-dark w-25"
                  src={UserProfile}
                  alt="EMS"
                />
              </div>
            </Link>
            <div className="back-btn" onClick={() => responsiveSidebar()}>
              <i className="fa fa-angle-left"></i>
            </div>
            <div
              className="toggle-sidebar"
              onClick={() => openCloseSidebar(sidebartoogle)}
            >
              <Grid className="status_toggle middle sidebar-toggle" />
            </div>
          </div>
          <div className="logo-icon-wrapper">
            <Link
              to={`${process.env.PUBLIC_URL}/dashboard/metersbygroup/${layout}`}
            >
              <img
                className="img-fluid"
                src={UserProfile}
                alt="EMS"
                width="80px"
              />
            </Link>
          </div>
          <nav className="sidebar-main" id="sidebar-main">
            <div className="left-arrow" onClick={scrollToLeft}>
              <ArrowLeft />
            </div>
            <div
              id="sidebar-menu"
              style={
                wrapper.split(" ").includes("horizontal-wrapper")
                  ? { marginLeft: margin + "px" }
                  : { margin: "0px" }
              }
            >
              <ul className="sidebar-links custom-scrollbar">
                <li className="back-btn">
                  <div className="mobile-back text-end">
                    <span>{"Back"}</span>
                    <i
                      className="fa fa-angle-right ps-2"
                      aria-hidden="true"
                    ></i>
                  </div>
                </li>
                {MENUITEMS.map((Item, i) => (
                  <Fragment key={i}>
                    <li className="sidebar-main-title">
                      <div>
                        <h6 className="lan-1">{Item.menutitle}</h6>
                        <p className="lan-2">{Item.menucontent}</p>
                      </div>
                    </li>
                    {Item.Items.map((menuItem, i) => (
                      <li className="sidebar-list" key={i}>
                        {menuItem.type === "sub" ? (
                          <Link
                            to={`${process.env.PUBLIC_URL}/dashboard/metersbygroup/${layout}`}
                            className={`text-decoration-none sidebar-link sidebar-title ${
                              menuItem.active ? "active" : ""
                            }`}
                            onClick={(event) => {
                              event.preventDefault();
                              setNavActive(menuItem);
                              activeClass(menuItem.active);
                            }}
                          >
                            <menuItem.icon />
                            <span>{menuItem.title}</span>
                            {menuItem.badge ? (
                              <label className={menuItem.badge}>
                                {menuItem.badgetxt}
                              </label>
                            ) : (
                              ""
                            )}
                            <div className="according-menu">
                              {menuItem.active ? (
                                <i className="fa fa-angle-down"></i>
                              ) : (
                                <i className="fa fa-angle-right"></i>
                              )}
                            </div>
                          </Link>
                        ) : (
                          ""
                        )}
                        {/* Manangement Role */}
                        {menuItem.type === "link" ? (
                          <Link
                            to={menuItem.path + "/" + layout}
                            className={`sidebar-link sidebar-title link-nav  ${
                              menuItem.active ? "active" : ""
                            }`}
                            onClick={() => toggletNavActive(menuItem)}
                          >
                            <menuItem.icon />
                            <span>{menuItem.title}</span>
                            {menuItem.badge ? (
                              <label className={menuItem.badge}>
                                {menuItem.badgetxt}
                              </label>
                            ) : (
                              ""
                            )}
                          </Link>
                        ) : (
                          ""
                        )}

                        {menuItem.children ? (
                          <ul
                            className="sidebar-submenu"
                            style={
                              menuItem.active
                                ? sidebartoogle
                                  ? {
                                      opacity: 1,
                                      transition: "opacity 500ms ease-in",
                                    }
                                  : { display: "block" }
                                : { display: "none" }
                            }
                          >
                            {menuItem.children.map((childrenItem, index) => {
                              return (
                                <li key={index}>
                                  {childrenItem.type === "sub" ? (
                                    <Link
                                      to={`${process.env.PUBLIC_URL}/dashboard/metersbygroup/${layout}`}
                                      className={`text-decoration-none ${
                                        childrenItem.active ? "active" : ""
                                      }`}
                                      onClick={(event) => {
                                        event.preventDefault();
                                        toggletNavActive(childrenItem);
                                      }}
                                    >
                                      {childrenItem.title}
                                      <span className="sub-arrow">
                                        <i className="fa fa-chevron-right"></i>
                                      </span>
                                      <div className="according-menu">
                                        {childrenItem.active ? (
                                          <i className="fa fa-angle-down"></i>
                                        ) : (
                                          <i className="fa fa-angle-right"></i>
                                        )}
                                      </div>
                                    </Link>
                                  ) : (
                                    ""
                                  )}

                                  {childrenItem.type === "link" ? (
                                    <Link
                                      to={childrenItem.path + "/" + layout}
                                      className={`text-decoration-none ${
                                        childrenItem.active ? "active" : ""
                                      }`}
                                      onClick={() =>
                                        toggletNavActive(childrenItem)
                                      }
                                    >
                                      {childrenItem.title}
                                    </Link>
                                  ) : (
                                    ""
                                  )}

                                  {childrenItem.children ? (
                                    <ul
                                      className="nav-sub-childmenu submenu-content"
                                      style={
                                        childrenItem.active
                                          ? { display: "block" }
                                          : { display: "none" }
                                      }
                                    >
                                      {childrenItem.children.map(
                                        (childrenSubItem, key) => (
                                          <li key={key}>
                                            {childrenSubItem.type === "link" ? (
                                              <Link
                                                to={
                                                  childrenSubItem.path +
                                                  "/" +
                                                  layout
                                                }
                                                className={`text-decoration-none ${
                                                  childrenSubItem.active
                                                    ? "active"
                                                    : ""
                                                }`}
                                                onClick={() =>
                                                  toggletNavActive(
                                                    childrenSubItem
                                                  )
                                                }
                                              >
                                                {childrenSubItem.title}
                                              </Link>
                                            ) : (
                                              ""
                                            )}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  ) : (
                                    ""
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          ""
                        )}
                      </li>
                    ))}
                  </Fragment>
                ))}
              </ul>
            </div>
            <div className="right-arrow" onClick={scrollToRight}>
              <ArrowRight />
            </div>
          </nav>
        </div>
      </>
    </Fragment>
  );
};

export default Sidebar;
