import React, { useState } from "react";
import axios from "axios";
import { Button, Error, Form, Input, Label } from "./styles/form-elements";
import { ReactComponent as LoadingIcon } from "./icons/hourglass.svg";
import useDelay from "./hooks/useDelay";

function AddWilder({ onSuccess }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [delayed, setDelayed] = useDelay(500);
  
  

  return (
    <Form
      onSubmit={async (e) => {
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
            onSuccess(result.data.result);
          }
        } catch (error) {
          setLoading(false);
          if (error.response) {
            setError(error.response.data.message);
          } else {
            setError(error.message);
          }
        }
      }}
    >
      <Label htmlFor="name-input">Name :</Label>
      <Input
        id="name-input"
        type="text"
        placeholder="Type the name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Label htmlFor="city-input">City :</Label>
      <Input
        id="city-input"
        type="text"
        placeholder="Type the city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {error !== "" && <Error>{error}</Error>}
      <Button disabled={loading} showLoading={loading && !delayed}>
        {loading && !delayed ? <LoadingIcon /> : "Add"}
      </Button>
    </Form>
  );
}

export default AddWilder;
