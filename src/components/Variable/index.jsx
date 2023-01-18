import React from "react";
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  Indicator,
} from "react-speedometer";
import { Container, Row, Col, Card, CardTitle, CardText } from "reactstrap";
import Swal from "sweetalert2";
import axios from "axios";
import useFullPageLoader from "../hooks/useFullPageLoader";
import { classes } from "../../data/layouts";

const Variabel = () => {
  // const defaultLayoutObj = classes.find(
  //   (item) => Object.values(item).pop(1) === "compact-wrapper"
  // );
  // const layout =
  //   localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  // const [loader, showLoader, hideLoader] = useFullPageLoader();
  return (
    <div style={{ backgroundColor: "red", height: 800 }}>
      <Speedometer value={54} max={80} angle={160} fontFamily="squada-one">
        <Background />
        <Arc />
        <Needle />
        <Progress />
        <Marks />
        <Indicator />
      </Speedometer>
    </div>
  );
};
export default Variabel;
