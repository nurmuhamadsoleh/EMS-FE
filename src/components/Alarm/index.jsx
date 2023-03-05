import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import moment from "moment";
import useFullPageLoader from "../hooks/useFullPageLoader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx/xlsx.mjs";
import TableShow from "../TableShow";
import { classes } from "../../data/layouts";
import { tokenHeader, url } from "../../helpers/config";
import { FiSearch, FiBell } from "react-icons/fi";

const AlarmHistory = () => {
  let [alarm, setAlarm] = useState([]);
  let [page, setPage] = useState(1);
  let [limit, setLimit] = useState(10);
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

  const alarmHistory = () => {
    console.log("data");
    nav(`${process.env.PUBLIC_URL}/alarmhistory/${layout}`);
  };
  const getData = async () => {
    showLoader();
    await axios({
      url: `${url.api}/alarm?search=${keyword}&page=${page}`,
      method: "GET",
      headers: tokenHeader(),
      data: {},
    })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          let data = res.data;
          console.log('data alarm',data);
          setAlarm(data.rows);
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
  }, [page, keyword]);
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setKeyword(query);
  };
  const handleOnExport = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(alarm);
    // untuk sebuah array
    // ws = XLSX.utils.aoa_to_sheet(user);
    XLSX.utils.book_append_sheet(wb, ws, "Mater Data Part 1");
    XLSX.writeFile(wb, `${new Date()} Report.xls`);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "empt-data",
    onAfterPrint: () => Swal.fire("Sukses", "Berhasil Print PDF", "success"),
    pageStyle: "print",
  });
  const changePage = (data) => {
    setPage(data.selected + 1);
  };
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
                <FiBell /> Alarm Today
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
                }}
              >
                <div className="mb-3">
                  <Button color="primary" onClick={alarmHistory}>
                    <FiSearch /> Alarm History
                  </Button>
                </div>
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
          <Container fluid>
            <Row>
              <Col className="col-sm-3 d-flex me-auto ms-3 mb-4">
                <Button
                  color="warning"
                  outline={true}
                  size="sm"
                  className="me-3 py-1 px-2"
                  onClick={handlePrint}
                >
                  Export PDF
                </Button>
                <Button
                  color="warning"
                  outline={true}
                  size="sm"
                  className="py-1 px-2"
                  onClick={handleOnExport}
                >
                  Export Excel
                </Button>
              </Col>
              <Col className="col-sm-4">
                <form className="row pe-2" onSubmit={handleSearch}>
                  <div className="col-auto">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mencari kata kunci"
                      onChange={(e) => setQuery(e.target.value)}
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
            <Row className="p-0 pt-3 border-0 shadow-lg">
              <div
                className="d-flex justify-content-center align-items-center"
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
                <tbody>
                  {/* {alarm.length <= 0 (<tr className="table-active">
                  <td className="table-active text-danger fw-bold">Data NUll</td>
                  </tr>) : ()} */}
                  {alarm.map((comment) => (
                    <>
                    {console.log('comment', comment)}
                    {comment === null ? <tr className="table-active">
                    <td className="table-active text-danger fw-bold">Data NUll</td>
                    </tr> : <tr className="table-active" key={comment.id_alarm}>
                    <td className="table-active">{comment.id_alarm}</td>
                    <td className="table-active">{comment.alarmtype}</td>
                    <td className="table-active">{comment.id_serial}</td>
                    <td className="table-active">{`${comment.id_serial} | ${comment.area} / ${comment.lokasi}`}</td>
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
                  </tr> }
                    </>
                    
                  ))}
                </tbody>
              </table>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default AlarmHistory;
