import { useState, useContext } from "react";
import axios from "axios";
import useDelay from "./useDelay";
import AppContext from "../context/AppContext";

function useCreateWilder() {
  const dispatch = useContext(AppContext);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [delayed, setDelayed] = useDelay(500);

  const formSubmission = async (e) => {
    e.preventDefault();
    try {
      setDelayed(true);
      setLoading(true);
      const result = await axios.post(
        "http://localhost:5000/api/wilder/create",
        {
          name,
          city,
        }
      );
      setLoading(false);
      if (result.data.success) {
        setError("");
        dispatch({
          type: "WILDER_ADDED",
          newWilder: result.data.result,
        });
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  };

  return {
    inputCity: {
      value: city,
      onChange: (e) => setCity(e.target.value),
    },
    inputName: {
      value: name,
      onChange: (e) => setName(e.target.value),
    },
    formSubmission,
    loading,
    delayed,
    error,
  };
}

export default useCreateWilder;
