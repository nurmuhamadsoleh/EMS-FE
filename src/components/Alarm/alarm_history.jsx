import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx/xlsx.mjs";
import useFullPageLoader from "../hooks/useFullPageLoader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TableShow from "../TableShow";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { classes } from "../../data/layouts";
import { tokenHeader, url } from "../../helpers/config";
import { FiSearch, FiBell } from "react-icons/fi";

const Alarm = () => {
  let [alarm, setAlarm] = useState([]);
  let [limit, setLimit] = useState(10);
  let [page, setPage] = useState(1);
  let [pages, setPages] = useState(1);
  let [keyword, setKeyword] = useState("");
  let [query, setQuery] = useState("");
  let [rows, setRows] = useState(0);
  let [msg, setMsg] = useState("");
  const componentRef = useRef();
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const nav = useNavigate();
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();

  const history = () => {
    console.log("data");
    nav(`${process.env.PUBLIC_URL}/alarm/${layout}`);
  };
  const getData = async () => {
    showLoader();
    await axios({
      url: `${url.api}/alarm/alarmhistory?search=${keyword}&limit=${limit}&page=${page}`,
      method: "GET",
      headers: tokenHeader(),
      data: {},
    })
      .then((res) => {
        console.log('res data',res.data);
        if (res.status === 200) {
          let data = res.data;
          console.log('data', data)
          setAlarm(data);
          setPage(data.page);
          setPages(data.totalPage);
          setRows(data.count);
          hideLoader();
        }
        Swal.fire("sucess", "Data Berhasil Di Tampilkan", "success");
      })
      .catch((err) => {
        console.log(err);
        hideLoader();
        Swal.fire("Sorry", "Data Gagal Di Tampilkan", "error");
      });
  };
  useEffect(() => {
    getData();
  }, []);
  // const handleSearch = (e) => {
  //   console.log("data", e);
  //   e.preventDefault();
  //   setPage(1);
  //   setKeyword(query);
  //   console.lg("query", query);
  // };
  // const changePage = (data) => {
  //   let currentPage = data.selected;
  //   setPage(data.selected);
  //   if (currentPage === 9) {
  //     setMsg(
  //       " Jika tidak menemukan data yang di cari, silakan cari data dengan kata kunci yang spesifik"
  //     );
  //   } else {
  //     setPage("");
  //   }
  // };
  return (
    <>
      <div
        className="row w-100"
        style={{
          marginTop: "80px",
          paddingTop: "50px",
          marginLeft: "20px",
          // backgroundColor: "red",
        }}
      >
        <div className="col">
          <div className="row mb-5">
            <div className="col-md-6 d-flex justify-content-start align-items-start">
              <h1 className="fw-bold fs-3">
                <FiBell /> Alarm History
              </h1>
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

              <div
                style={{
                  marginLeft: "auto",
                  // display: "flex",
                  // gap: "20px",
                }}
              >
                <div className="ms-5 mb-3">
                  <Button color="primary" onClick={history}>
                    <FiSearch /> Alarm Today
                  </Button>
                </div>
                {/* <div>
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
                </div> */}
                <div className="col-sm-12 d-flex justify-content-end align-items-end">
                  <p className="has-text-centered has-text-danger">{msg}</p>
                  <nav aria-label="Page navigation example" key={rows}>
                    {/* <ReactPaginate
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
                    /> */}
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <Container fluid>
            <Row>
              <Col className="col-sm-3 d-flex me-auto ms-3 mb-4">
                <Button
                  color="warning"
                  outline={true}
                  size="sm"
                  className="me-3 py-1 px-2"
                >
                  Export PDF
                </Button>
                <Button
                  color="warning"
                  outline={true}
                  size="sm"
                  className="py-1 px-2"
                >
                  Export Excel
                </Button>
              </Col>
              <Col className="col-sm-4">
                <form className="row pe-2">
                  <div className="col-auto">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mencari kata kunci"
                      // onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                  <div className="col-auto">
                    <button type="submit" className="btn btn-primary">
                      Search
                    </button>
                  </div>
                </form>
              </Col>
            </Row>
            <span className="text-center">{loader}</span>
            <Row className="p-0 pt-3 border-0 shadow-lg">
              <div
                className="d-flex justify-content-center align-items-center"
                ref={componentRef}
              >
                {loader}
              </div>
              <table
                className="table table-success text-center table-bordered"
                ref={componentRef}
              >
                <thead>
                  <tr className="text-center">
                    <th scope="col text-center">No</th>
                    <th scope="col text-center">Alarm_Type</th>
                    <th scope="col text-center">Id_Meter</th>
                    <th scope="col text-center">Name_Group_Sub</th>
                    <th scope="col text-center">Alarm_Log</th>
                    <th scope="col text-center">Date_Time</th>
                    <th scope="col text-center">Created</th>
                    <th scope="col text-center">Upated</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {alarm.map((comment) => (
                    <tr className="table-active" key={comment.id}>
                      <td className="table-active">{comment.id_alarm}</td>
                      <td className="table-active">{comment.alarmtype}</td>
                      <td className="table-active">{comment.id_name}</td>
                      <td className="table-active">{comment.alarmlog}</td>
                      <td className="table-active">
                        {moment().subtract(1, "days").format(comment.datetime)}
                      </td>
                      <td className="table-active">
                        {moment().subtract(1, "days").format(comment.created)}
                      </td>
                      <td className="table-active">
                        {moment().subtract(1, "days").format(comment.updated)}
                      </td>
                    </tr>
                  ))}
                </tbody> */}
              </table>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Alarm;
