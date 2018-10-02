import axios from "axios";
import { FETCH_RESULTS } from "./types";

export const fetchResults = query => async dispatch => {
  const res = await axios.post("/search/results", { query });
  console.log("action response: ", res.data);
  res.data = { ...res.data, ...{ query } };
  console.log("response modified: ", res.data);
  dispatch({ type: FETCH_RESULTS, payload: res.data });
};
