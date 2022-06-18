import React, { useState, useEffect, useCallback } from "react";
import "./pagination.css";
function App(props) {
  const { data = [], pageSize, state, methods,pagesArr,newTableData } = props || {};
  const { setState, setNewData } = methods;
  return (
    <div className="paginationContainer">
      {data.length < pageSize ? null : (
        <div class="pagination">
          {state.selectedPageNum > 1
            ? arrowItem({
                state,
                pageSize,
                setNewData,
                setState,
                data,
                forword: false,
              })
            : null}
          {pagesArr.map((p, index) => {
            return (
              <a
                href="#"
                onClick={() => {
                  setState({ ...state, selectedPageNum: index + 1 });
                  let oldTableData1 = [...data];
                  let filterValue = oldTableData1.splice(
                    0,
                    (index + 1) * pageSize
                  );
                  setNewData(filterValue);
                }}
                class={state.selectedPageNum - 1 == index ? "active" : ""}
              >
                {index + 1}
              </a>
            );
          })}
          {state.selectedPageNum == pagesArr.length
            ? null
            : arrowItem({
                state,
                pageSize,
                setNewData,
                setState,
                data,
                forword: true,
              })}
        </div>
      )}
      <div className="totalDataFound">
        <span className="totalTextStyle">
          Total Data Found :{" "}
          {`${data.length || 0} / ${newTableData.length || 0}`}
        </span>
      </div>
    </div>
  );
}

export default App;

const arrowItem = ({
  state,
  pageSize,
  setNewData,
  setState,
  data,
  forword,
}) => {
  return (
    <a
      href="#"
      onClick={() => {
        let pNo = state.selectedPageNum;
        if (forword) {
          pNo += 1;
        } else {
          pNo -= 1;
        }
        setState({ ...state, selectedPageNum: pNo });
        let oldTableData1 = [...data];
        let filterValue = oldTableData1.splice(0, pNo * pageSize);
        setNewData(filterValue);
      }}
    >
      &raquo;
    </a>
  );
};
