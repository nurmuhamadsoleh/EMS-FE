import React, { useState } from "react";
import { Input, Form, Row, Col, FormGroup, Label } from "reactstrap";

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const onInputChange = (value) => {
    setSearch(value);
    onSearch(value);
  };
  return (
    <Form>
      <Row>
        <Col md="12">
          <FormGroup>
            <Row className="d-flex justify-content-center align-items-center">
              <Col sm={2}>
                <Label htmlFor="search" className="fw-bold">
                  Search
                </Label>
              </Col>
              <Col sm={10}>
                <Input
                  id="search"
                  name="search"
                  type="text"
                  className="form-control ms-3"
                  //   style={{ width: "240px" }}
                  placeholder="Masukan Kata Kunci"
                  value={search}
                  onChange={(e) => onInputChange(e.target.value)}
                />
              </Col>
            </Row>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default Search;
