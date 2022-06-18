import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import "./listPage.css";
const tableHeader = [
  { label: "Market Name", field: "marketName" },
  { label: "Quote Currency", field: "quoteCurrency" },
  { label: "LB Rate", field: "LBRate" },
  { label: "LB Vol", field: "LBVol" },
  { label: "LS Rate", field: "LSRate" },
  { label: "LT Vol", field: "LTVol" },
  { label: "Bid", field: "bid" },
  { label: "To Vol Ask", field: "tVolAsk" },
  { label: "To Vol Bid", field: "tVolBid" },
  { label: "TP 24", field: "tp24" },
  { label: "V 24", field: "v24" },
];
function App(props) {
  let [selectedIndex,setIndex]=useState("")
  const tableData = props?.tableData || [];
  const navigate = useNavigate();
  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            {tableHeader.map((val, index) => {
              return <th key={index}>{val.label}</th>;
            })}
          </tr>
        </thead>
        {tableData.map((data, index) => {
          return (
            <tr
              key={index}
              onClick={() => {
                navigate("/details",{state:data});
              }}
              onMouseOver={()=>{
                setIndex(index)
              }}
              onMouseLeave={()=>{
                console.log("onMouseLeave")
                setIndex("null")
              }}
              style={{backgroundColor: selectedIndex==index ? "#dddddd":"white",cursor:"pointer"}}
            >
              {tableHeader.map((val, index) => {
                let value = (data && data[val?.field]) || "";
                if (data && !isNaN(value)) {
                  value = parseFloat(value).toFixed(2);
                }
                return <td>{value}</td>;
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
