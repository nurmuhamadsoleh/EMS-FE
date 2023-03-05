import React, {useEffect, useState} from "react";
// import "./index.css";
import ReactSpeedometer from "react-d3-speedometer";

const CardMeterDigital = ({value, title, label, nilai}) =>{
    return(
        <>
            <div
        style={{
          // height: "100px",
          width: "300px",
          backgroundColor: "#f5f0f0",
        //   borderRadius: 5,
        //   paddingRight: 10,
        //   marginLeft: "20px",
        //   marginTop: "50px",
        }}
      >
        <ReactSpeedometer
          value={100}
          needleColor="steelblue"
          needleTransition="easeElastic"
          currentValueText="V12"
          textColor={"#fa0a1a"}
          labelFontSize={"12px"}
          valueTextFontSize={"31px"}
          paddingHorizontal={10}
          paddingVertical={10}
          needleHeightRatio={0.5}
          segmentColors={[
            "#bf616a",
            "#d08770",
            "#ebcb8b",
            "#a3be8c",
            "#fcba03",
          ]}
          width={300}
          height={180}
          segments={5} //batas value setiap segment
          maxValue={250} //nilai maximal
          minValue={0}
        />
        <div className="row text-center">
          <div className="col-sm-6">
            <p className="text-danger bg-light fw-bold p-2">Teg.Phase RN</p>
          </div>
          <div className="col-sm-6">
            <p className="text-danger fw-bold bg-danger text-light p-2">
              227.0 V
            </p>
          </div>
        </div>
      </div>
        </>
    )
}
export default CardMeterDigital;