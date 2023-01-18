import React, { Fragment } from "react";
import { Container, Row, Col } from "reactstrap";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md="12" className="footer-copyright text-center">
              <p className="mb-0 fw-bold">
                "Copyright 2022 © EMS (Energy Monitoring System). All rights
                reserved."
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
