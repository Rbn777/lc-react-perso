import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import {
  CardRow,
  Container,
  Footer,
  Header,
  ShowButton,
} from "./styles/elements";
import Wilder from "./Wilder";
import AddWilder from "./AddWilder";
import { ReactComponent as PlusCircle } from "./icons/add-circle.svg";
import { ReactComponent as MinusCircle } from "./icons/minus-circle.svg";
import { Success } from "./styles/form-elements";

function App() {
  const [wilders, setWilders] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchWilders = async () => {
      try {
        const result = await axios("http://localhost:5000/api/wilder/read");
        setWilders(result.data.result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWilders();
  }, []);
  const closeForm = () => setShowAddForm(false);

  return (
    <div>
      <Header>
        <Container>
          <h1>Wilders Book</h1>
        </Container>
      </Header>
      <Container>
        <ShowButton onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? <MinusCircle /> : <PlusCircle />}
        </ShowButton>
        {showAddForm ? (
          <AddWilder
            onSuccess={(message) => {
              closeForm();
              setSuccessMessage(message);
            }}
          />
        ) : (
          successMessage !== "" && <Success>{successMessage}</Success>
        )}
      </Container>
      <Container>
        <h2>Wilders</h2>
        <CardRow>
          {wilders.map((wilder) => (
            <Wilder key={wilder._id} {...wilder} />
          ))}
        </CardRow>
      </Container>
      <Footer>
        <Container>
          <p>&copy; 2020 Wild Code School</p>
        </Container>
      </Footer>
    </div>
  );
}

export default App;
