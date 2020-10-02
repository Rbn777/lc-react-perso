import { useEffect } from "react";
import axios from "axios";

const useFetchWilders = (dispatch) => {
  useEffect(() => {
    console.log("feth");
    const fetchWilders = async () => {
      try {
        const result = await axios("http://localhost:5000/api/wilder/read");
        dispatch({
          type: "WILDERS_FETCH_SUCCESS",
          wilders: result.data.result,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchWilders();
  }, [dispatch]);
};

export default useFetchWilders;
