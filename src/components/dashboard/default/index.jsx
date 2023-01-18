import React, { Fragment, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FiLayout } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Swal from "sweetalert2";
import useFullPageLoader from "../../../components/hooks/useFullPageLoader";
import { tokenHeader, url } from "../../../helpers/config";
import {
  Row,
  Col,
  Card,
  Button,
  Container,
  CardFooter,
  CardHeader,
  FormGroup,
} from "reactstrap";
import { FiSearch } from "react-icons/fi";
import { classes } from "../../../data/layouts";
import TableShow from "../../TableShow";

const OverviewAllMeters = () => {
  const nav = useNavigate();
  const styleInput = {
    width: "100%",
    borderRadius: "4px",
    outline: "none",
    border: "none",
    fontSize: "18px",
    fontWeight: "600",
  };
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  const findById = (id) => {
    nav(
      `${process.env.PUBLIC_URL}/dashboard/overviewallmeters/${id}/${layout}`
    );
  };
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  let [items, setItems] = useState([]);
  let [page, setPage] = useState(1);
  let [pages, setPages] = useState(1);
  let [rows, setRows] = useState(0);
  let [limit, setLimit] = useState(10);
  const [msg, setMsg] = useState("");
  const getData = useCallback(async () => {
    showLoader();
    await axios({
      url: `${url.api}/metergroup?page=${page}&limit=${limit}`,
      method: "GET",
      headers: tokenHeader(),
      data: {},
    })
      .then((res) => {
        if (res.status === 200) {
          let data = res.data;
          console.log(data);
          setItems(data.rows);
          setPage(data.page);
          setLimit(data.limit);
          setRows(data.count);
          setPages(data.totalPage);
          hideLoader();
        }
      }).catch((err) => {
        console.log(err);
        hideLoader();
        Swal.fire("Sorry", `Data Gagal Di Tampilkan ${err.messege}`, "error");
      });
  }, []);
  const changePage = (data) => {
    let currentPage = data.selected;
    setPage(data.selected);
    if (currentPage === 9) {
      setMsg(
        " Jika tidak menemukan data yang di cari, silakan cari data dengan kata kunci yang spesifik"
      );
    } else {
      setPage("");
    }
  };
  useEffect(() => {
    getData();
    let token = localStorage.getItem("token");
    let role = localStorage.getItem("role");
    if (!token && !role) {
      return (window.location.href = `${process.env.PUBLIC_URL}`);
    }
  }, [page,limit]);
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <Row className="w-100">
        <div className="row mb-4">
          <div className="col-md-6">
            <h2 className="fw-bold fs-3 text-dark">
              <FiLayout /> OVERVIEW ALL By Groups
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 10,
              color: "black",
              fontWeight: "bold",
            }}
          >
            <span>
              Total Rows: {rows} Page: {rows ? page : 0} of {pages}
            </span>
            <div style={{ marginLeft: "auto" }}>
              <TableShow
                showValue={limit}
                dataList={[5, 10, 25, 50, 100]}
                handleChange={(callback) => {
                  if (callback !== "undefined") {
                    setLimit(callback);
                    setPage(1);
                    getData(1, callback);
                  }
                }}
              />
              <div className="col-sm-12 d-flex justify-content-end align-items-end">
                <p className="has-text-centered has-text-danger">{msg}</p>
                <nav aria-label="Page navigation example" key={rows}>
                  <ReactPaginate
                    previousLabel={"< Prev"}
                    nextLabel={"Next >"}
                    pageCount={Math.min(10, pages)}
                    onPageChange={changePage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    breakLabel={"..."}
                    containerClassName={"pagination"} // dapat di lakukan custom
                    pageLinkClassName={"page-link"}
                    previousLinkClassName={"page-link"}
                    nextLinkClassName={"page-link"}
                    activeClassName={"page-item active"}
                    disabledLinkClassName={"page-item disabled"}
                  />
                </nav>
              </div>
            </div>
          </div>
        </div>
        <span className="text-center">{loader}</span>
        {/* Map API */}
        {items.map((item) => (
          <Fragment key={item.id_seq}>
          <Col className="col-lg-4">
          <Card className="d-flex justify-content-center">
            <CardHeader
              style={{
                backgroundColor: "black",
                display: "flex",
                height: "80px",
                flexDirection: "col",
                justifyContent: "space-between",
                padding: 5,
              }}
            >
              <Col sm="4">{item.metergroupid}</Col>
              <Col sm="4" style={{ marginLeft: -50, display: "flex" }}>
                <span>{item.metergroupname}</span>
              </Col>
              <div>
                <Col sm="4">
                  <Button
                    color="warning"
                    onClick={(id) => findById(item.metergroupid)}
                  >
                    <FiSearch />
                  </Button>
                </Col>
              </div>
            </CardHeader>
            <img
              alt="card cap"
              src="https://picsum.photos/318/180"
              width="100%"
              style={{ zIndex: 2, position: "relative" }}
            />
            <div
              style={{
                color: "black",
                zIndex: 30,
                position: "absolute",
                top: 100,
                left: 10,
              }}
            >
              <h1>{item.num_member}</h1>
              <span>KWH Meters</span>
            </div>
          </Card>
        </Col>
          </Fragment>
        ))}
      </Row>
    </Container>
  );
};

export default OverviewAllMeters;
