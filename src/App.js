import React, { useEffect, useReducer } from "react";
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

const initialState = {
  showAddForm: false,
  successMessage: "",
  wilders: [],
};
const appReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SHOW_ADD_FORM":
      return { ...state, showAddForm: !state.showAddForm };
    case "WILDER_ADDED":
      return {
        ...state,
        showAddForm: false,
        successMessage: `The wilder ${action.newWilder.name} has been successfully added`,
        wilders: [{ ...action.newWilder, justAdded: true }, ...state.wilders],
      };
    case "WILDERS_FETCH_SUCCESS":
      return { ...state, wilders: action.wilders };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <Header>
        <Container>
          <h1>Wilders Book</h1>
        </Container>
      </Header>
      <Container>
        <ShowButton onClick={() => dispatch({ type: "TOGGLE_SHOW_ADD_FORM" })}>
          {state.showAddForm ? <MinusCircle /> : <PlusCircle />}
        </ShowButton>
        {state.showAddForm ? (
          <AddWilder
            onSuccess={(newWilder) =>
              dispatch({ type: "WILDER_ADDED", newWilder })
            }
          />
        ) : (
          state.successMessage !== "" && (
            <Success>{state.successMessage}</Success>
          )
        )}
      </Container>
      <Container>
        <h2>Wilders</h2>
        <CardRow>
          {state.wilders.map((wilder) => (
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
