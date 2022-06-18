import "./details.css";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchData, getSingleData } from "../../service";
import { useEffect, useState } from "react";
import { backIcon } from "../../Images/Images";
function Details(props) {
  const [datafetch, setData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { marketName } = location.state || {};
  useEffect(() => {
    getSingleData(marketName)
      .then((data) => {
        return data.json();
      })
      .then(({ data }) => {
        setData(data[0]);
      });
  }, []);

  return (
    <div className="conatinerStyle">
      <div onClick={() => navigate(-1)} className="headerContainer">
        <img src={backIcon} className="imageStyle" />
        <span className="backTextStyle">{marketName}</span>
      </div>
      <div className="extarnalField">
        {singleRow({
          label: "Curr To Name",
          value: datafetch?.currToName,
          styleChange: true,
        })}
        {singleRow({
          label: "ASK",
          value: parsValue(datafetch?.ask),
          styleChange: true,
        })}
        {singleRow({
          label: "BID",
          value: parsValue(datafetch?.bid),
          styleChange: true,
        })}
        {singleRow({
          label: "Sprd",
          value: parsValue(datafetch?.sprd),
          styleChange: true,
        })}
        {singleRow({
          label: "Is Active",
          value: datafetch?.isActive ? "Active" : "In Active",
        })}
      </div>
      <div className="bottomTableStyle">
        {renderTableDetails({
          data: [
            { label: "Rate", value: parsValue(datafetch?.LBRate) },
            { label: "Vol", value: parsValue(datafetch?.LBVol) },
          ],
          label: "LB",
        })}
        {renderTableDetails({
          data: [
            { label: "Rate", value: parsValue(datafetch?.LTRate) },
            { label: "Vol", value: parsValue(datafetch?.LTVol) },
          ],
          label: "LT",
        })}
        {renderTableDetails({
          data: [
            { label: "Rate", value: parsValue(datafetch?.LSRate) },
            { label: "Vol", value: parsValue(datafetch?.LSVol) },
          ],
          label: "LS",
        })}
        {renderTableDetails({
          data: [
            { label: "C24", value: parsValue(datafetch?.c24) },
            { label: "C24P", value: parsValue(datafetch?.c24p) },
            { label: "TP24", value: parsValue(datafetch?.tp24) },
            { label: "V24", value: parsValue(datafetch?.v24) },
            { label: "H24", value: parsValue(datafetch?.h24) },
            { label: "L24", value: parsValue(datafetch?.l24) },
          ],
          label: "C24",
        })}
        {renderTableDetails({
          data: [
            { label: "Ask", value: parsValue(datafetch?.tVolAsk) },
            { label: "Bid", value: parsValue(datafetch?.tVolBid) },
          ],
          label: "T Vol",
        })}
        {renderTableDetails({
          data: [
            { label: "Quote", value: datafetch?.quoteCurrency },
            { label: "Base", value: datafetch?.baseCurrency },
          ],
          label: "Currency",
        })}
      </div>
    </div>
  );
}

export default Details;

const parsValue = (value) => {
  return parseFloat(value).toFixed(2);
};

const renderTableDetails = ({ data, label }) => {
  return (
    <div className="lbStyle">
      <div className="lbInnerStyle">{label}</div>
      {data.map((x) => {
        return singleRow({ value: x.value, label: x.label });
      })}
    </div>
  );
};

const singleRow = ({ label, value, styleChange }) => {
  return (
    <div className={styleChange ? "rowStyle1" : "rowStyle"}>
      <span className="textLabelStyle">
        {styleChange ? label + " :" : label}
      </span>
      <span className={styleChange ? "valueTextStyle1" : "valueTextStyle"}>
        {value || "-"}
      </span>
    </div>
  );
};
