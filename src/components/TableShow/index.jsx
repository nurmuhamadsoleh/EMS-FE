import React from "react";

const TableShow = (props) => {
  const { dataList = [10, 25, 50, 100], showValue = 10, handleChange } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        alignItems: "start",
        // gap: 5,
        // marginBottom: 10,
      }}
    >
      <select
        name="page"
        id="page"
        style={{
          width: 120,
          height: 35,
          //   backgroundColor: "yellow",
          borderRadius: 10,
          marginTop: -20,
          marginBottom: 25,
          color: "black",
        }}
        value={showValue}
        onChange={(e) => handleChange(e.target.value)}
      >
        {/* <option value="Data">Data</option>
        <option value="Data">Data</option>
        <option value="Data">Data</option> */}
        {dataList.map((val) => {
          // console.log("value", val);
          return (
            <option key={val} value={val}>
              {val}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default TableShow;
