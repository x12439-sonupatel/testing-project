import React, { useState, useEffect } from "react";
import "./home.css";
import ListingPage from "../ListingPage/ListingPage";
import Pagination from "../Pagination/Pagination";
import { fetchData } from "../../service";
function App(props) {
  const [oldTableData, setData] = useState([]);
  let [newTableData, setNewData] = useState([]);
  const [state, setState] = useState({
    inputText: "",
    loaing: false,
    search: false,
    selectedPageNum: 1,
    searchData: [],
  });
  let totalLength = state && state.searchData.length;
  let pageSize = 15;
  let pagesArr = Array(Math.ceil(totalLength / pageSize)).fill(true);

  useEffect(() => {
    setState({ ...state, loaing: true });
    try {
      fetchData()
        .then((data) => {
          return data.json();
        })
        .then(({ data }) => {
          setData(data);
          setState({ ...state, searchData: data, loaing: false });
          let filterData = [...data].splice(0, pageSize);
          setNewData(filterData);
        });
    } catch (err) {
      setState({ ...state, loaing: false });
    }
  }, []);

  const searchMethod = () => {
    const { inputText } = state || {};
    let searchData = state.searchData.filter((val) => {
      if (val.marketName.toLowerCase().includes(inputText.toLowerCase())) {
        return true;
      }
      return false;
    });
    let filterData = [...searchData].splice(0, pageSize);
    setNewData(filterData);
    setState({ ...state, searchData, search: true, selectedPageNum: 1 });
  };

  const resetData = () => {
    let filterData = [...oldTableData].splice(0, pageSize);
    setNewData(filterData);
    setState({ ...state, searchData: oldTableData, search: false });
  };

  const handleText = (e) => {
    setState({ ...state, inputText: e.target.value, searchData: oldTableData });
  };

  return (
    <div className="App">
      {state.loaing ? (
        <div className="loader" />
      ) : (
        <div className="containerStyle">
          <div className="inputContainer">
            <input
              placeholder="Search Market Name..."
              className="searchInput"
              onChange={handleText}
              value={state.inputText}
            />
            {state.search ? (
              <button type="submit" className="buttonStyle" onClick={resetData}>
                X
              </button>
            ) : null}
            <button
              type="submit"
              className="buttonStyle"
              onClick={searchMethod}
            >
              Search
            </button>
          </div>
          <ListingPage tableData={newTableData} />
          <Pagination
            state={state}
            pageSize={pageSize}
            pagesArr={pagesArr}
            methods={{ setState, setNewData }}
            data={state.searchData}
            newTableData={newTableData}
          />
        </div>
      )}
    </div>
  );
}

export default App;
