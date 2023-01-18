import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import moment from "moment";
import useFullPageLoader from "../hooks/useFullPageLoader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
// import TableShow from "../TableShow";
import { useReactToPrint } from "react-to-print";
import ReactPaginate from "react-paginate";
import * as XLSX from "xlsx/xlsx.mjs";
import { classes } from "../../data/layouts";
import { tokenHeader, url } from "../../helpers/config";
import { FiSearch, FiBell } from "react-icons/fi";

const Calculate = () => {
  let [billing, setBilling] = useState([]);
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

  const calculateBilling = () => {
    console.log("data");
    nav(`${process.env.PUBLIC_URL}/variabel/${layout}`);
  };
  const getData = useCallback(async () => {
    showLoader();
    await axios({
      url: `${url.api}/billing/calculate?search=${keyword}?page=${page}`,
      method: "POST",
      headers: tokenHeader(),
      data: {},
    })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          let data = res.data;
          console.log('biling', data)
          setBilling(data.rows);
          setPage(data.page);
          setPages(data.totalPage);
          setRows(data.count);
          hideLoader();
        }
      })
      .catch((err) => {
        console.log(err);
        hideLoader();
        Swal.fire("Sorry", "Data Gagal Di Tampilkan", "error");
      });
  }, []);
  useEffect(() => {
    getData();
  }, [page, query]);
    const handleSearch = (e) => {
      // console.log("data", e);
      e.preventDefault();
      setPage(1);
      setKeyword(query);
      // console.lg("query", query);
    };
  const changePage = (data) => {
    setPage(data.selected + 1);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "empt-data",
    onAfterPrint: () => Swal.fire("Sukses", "Berhasil Print PDF", "success"),
    pageStyle: "print",
  });
  const handleOnExport = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(billing);
    // untuk sebuah array
    // ws = XLSX.utils.aoa_to_sheet(user);
    XLSX.utils.book_append_sheet(wb, ws, "Mater Data Part 1");
    XLSX.writeFile(wb, `${new Date()} Report.xls`);
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
                <FiBell /> Billing
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
                  <Button color="primary" onClick={calculateBilling}>
                    <FiSearch /> Billng Form
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
              <div className="d-flex justify-content-center align-items-center">
                {loader}
              </div>
              <table
                className="table table-success text-center table-bordered"
                ref={componentRef}
              >
                <thead>
                <tr>
                  <th rowSpan={1}>No.</th>
                  <th colSpan="2">Upsage Priode (UP)</th>
                  <th colSpan="3">Kwh Total (TOT)</th>
                  <th colSpan="3">Kwh WBP (WBP)</th>
                  <th colSpan="3">Cost Usage (RP)</th>
                  <th>Total</th>
                </tr>
                <tr>
                  <th></th>
                  <th>UP_Start</th>
                  <th>UP_End</th>
                  <th>TOT_Start</th>
                  <th>TOT_End</th>
                  <th>TOT_Usage</th>
                  <th>WBP_Start</th>
                  <th>WBP_End</th>
                  <th>WBP_Usage</th>
                  <th>RP_WBP</th>
                  <th>RP_LWBP</th>
                  <th>RP_TOTAL</th>
                  <th>PPN-10%</th>
                </tr>
                </thead>
                <tbody>
                  {billing.map((comment, index) => (
                    <tr className="table-active" key={index + 1}>
                      <td className="table-active">{parseInt(index + 1)}</td>
                      <td className="table-active">{comment.id_serial}</td>
                      <td className="table-active">{comment.id_name}</td>
                      <td className="table-active">{comment.kwh_exp_start}</td>
                      <td className="table-active">{comment.kwh_exp_stop}</td>
                      <td className="table-active">{comment.kwh_exp_usage}</td>
                      <td className="table-active">{comment.kwh1_start}</td>
                      <td className="table-active">{comment.kwh1_stop}</td>
                      <td className="table-active">{comment.kwh1_usage}</td>
                      <td className="table-active">{comment.kwh2_start}</td>
                      <td className="table-active">{comment.kwh2_stop}</td>
                      <td className="table-active">{comment.kwh2_usage}</td>
                      <td className="table-active">{parseInt(0)}</td>
                      {/* <td className="table-active">
                        {moment().subtract(1, "days").format(comment.datetime)}
                      </td>
                      <td className="table-active">
                        {moment().subtract(1, "days").format(comment.created)}
                      </td>
                      <td className="table-active">
                        {moment().subtract(1, "days").format(comment.updated)}
                      </td> */}
                    </tr>
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

export default Calculate;
