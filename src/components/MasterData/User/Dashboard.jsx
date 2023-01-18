import React, { useEffect, useState, useRef, useCallback } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Button, Container, Row, Col } from "reactstrap";
import { tokenHeader, url } from "../../../helpers/config";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx/xlsx.mjs";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { FiPlus, FiUser } from "react-icons/fi";
import { classes } from "../../../data/layouts";
import TableShow from "../../TableShow";
import { FiEdit2, FiTrash } from "react-icons/fi";

const DashbaordUser = () => {
  const nav = useNavigate();
  const [user, setUser] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [msg, setMsg] = useState("");
  const [rows, setRows] = useState(0);
  const [query, setQuery] = useState("");
  const componentRef = useRef();
  const [role, setRole] = useState(null);

  const getData = async () => {
    showLoader();
    await axios({
      url: `${url.api}/user?search_query=${keyword}&page=${page}&limit=${limit}`,
      method: "GET",
      headers: tokenHeader(),
      data: {},
    })
      .then((res) => {
        if (res.status === 200) {
          let data = res.data;
          console.log('data user', data.rows)
          setUser(data.rows);
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
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "empt-data",
    onAfterPrint: () => Swal.fire("Sukses", "Berhasil Print PDF", "success"),
    pageStyle: "print",
  });
  const handleOnExport = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(user);
    // untuk sebuah array
    // ws = XLSX.utils.aoa_to_sheet(user);
    XLSX.utils.book_append_sheet(wb, ws, "Mater Data Part 1");
    XLSX.writeFile(wb, `${new Date()} Report.xls`);
  };
  const changePage = (data) => {
    setPage(data.selected + 1);
  };
  
  const onClickDelete = (id) => {
    console.log("idnya", id);
    Swal.fire({
      title: "Apa anda yakin?",
      text: "Apakah ada yakin ingin menghapus data ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        showLoader();
        axios({
          method: "DELETE",
          url: `${url.api}/user/${id}`,
          headers: tokenHeader(),
          data: {},
        })
          .then((res) => {
            Swal.fire("Berhasil!", "Data berhasil di hapus.", "success");
            getData();
            hideLoader();
          })
          .catch((err) => {
            console.log(err);
            Swal.fire(
              "Peringatan!",
              "Terjadi kesalahan saat menghapus data",
              "warning"
            );
            hideLoader();
          });
      }
    });
  };
  useEffect(() => {
    getData();
    let token = localStorage.getItem("token");
    let role = localStorage.getItem("role");
    if (!token && !role) {
      return (window.location.href = `${process.env.PUBLIC_URL}`);
    }
  }, [page, query, limit]);
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  const handleEdit = (id) => {
    nav(`${process.env.PUBLIC_URL}/manangerUserEdit/${layout}/${id}`);
  };
  const handleAdd = () => {
    nav(`${process.env.PUBLIC_URL}/manangerUserAdd/${layout}`);
  };
  const handleSearch = (e) => {
    //agara tidak reload ketika di klik OnSubmit
    e.preventDefault();
    // pada saat pencarian kembalikan page ke 0 karena ingin melakukan relasi antar pencarian dengan pagination
    setPage(1);
    setKeyword(query);
    console.log("query", query);
  };
  return (
    <>
      <div
        className="row w-100"
        style={{ marginTop: "80px", paddingTop: "50px", marginLeft: "20px" }}
      >
        <div className="col">
          <div className="row" style={{ marginBottom: 20 }}>
            <div className="col-md-6 d-flex justify-content-start align-items-start">
              <h1 className="fw-bold fs-3">
                <FiUser /> Users
              </h1>
            </div>
            <div className="col-md-6 d-flex justify-content-end align-items-end">
                <Button color="primary" onClick={handleAdd}>
                  <FiPlus /> Tambah
                </Button>
              </div>
            {/* {role == "ADM" && (
              
            )} */}
          </div>

          <Container fluid>
            <Row>
              <Col className="col-sm-3 d-flex me-auto ms-2 mb-4">
                <Button
                  color="warning"
                  outline={true}
                  size="sm"
                  className="me-3 px-2"
                  onClick={handlePrint}
                >
                  Export PDF
                </Button>
                <Button
                  color="warning"
                  outline={true}
                  size="sm"
                  className="px-2"
                  onClick={handleOnExport}
                >
                  Export Excel
                </Button>
              </Col>
              <Col className="col-sm-5 d-flex justify-content-end ms-auto">
                <form className="row" onSubmit={handleSearch}>
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
                  <tr className="text-center">
                    <th scope="col text-center">Username</th>
                    <th scope="col text-center">Email</th>
                    <th scope="col text-center">Name</th>
                    <th scope="col text-center">Level</th>
                    <th scope="col text-center">Active</th>
                    <th scope="col text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {user.map((item) => (
                    <tr className="table-active" key={item.id_user}>
                      <td className="table-active">{item.username}</td>
                      <td className="table-active">{item.email}</td>
                      <td className="table-active">{item.nama}</td>
                      <td className="table-active">{item.level}</td>
                      <td className="table-active">{item.aktif ? "Y" : "N"}</td>
                      <td className="table-active w-25">
                        <div className="row">
                          <div className="col-sm-6">
                            <Button
                              color="primary"
                              size="sm"
                              className="me-1 px-3"
                              onClick={() => handleEdit(item.id_user)}
                            >
                              <FiEdit2 /> Edit
                            </Button>
                          </div>
                          <div className="col-sm-6">
                            <Button
                              className="btn btn-danger px-2"
                              size="sm"
                              onClick={() => onClickDelete(item.id_user)}
                            >
                              <FiTrash /> Delete
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>
                Total Rows: {rows} Page: {rows ? page : 0} of {pages}
              </p>
              <TableShow
                showValue={limit}
                dataList={[5, 10, 25, 50, 100]}
                handleChange={(callback) => {
                  if (callback != "undefined") {
                    setLimit(callback);
                    setPage(0);
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
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default DashbaordUser;
