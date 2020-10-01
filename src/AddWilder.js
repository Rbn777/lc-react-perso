import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Error, Form, Input, Label } from "./styles/form-elements";
import { ReactComponent as LoadingIcon } from "./icons/hourglass.svg";

function AddWilder({ onSuccess }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [delayed, setDelayed] = useState(false);
  
  let timer = null;

  useEffect(() => {
    return function cleanup() {
      // what is happening here ?
      console.log("timer cleaning",timer)
      clearTimeout(timer);
    };
  },[timer]);

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          setDelayed(true);
          setLoading(true);
          // Delay by 2000ms to see the issue
          timer = setTimeout(() => {setDelayed(false);}, 2000);
          console.log("timer creation", timer)
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
            onSuccess(
              `The wilder ${result.data.result.name} has been successfully added`
            );
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
