import endPoints from "./endPoint";
const fetchData =  () => {
  return fetch(endPoints.allData);
};

const getSingleData =  (params) => {
  return fetch(`${endPoints.allData}?symbol=${params}`);
};

export { fetchData, getSingleData };
