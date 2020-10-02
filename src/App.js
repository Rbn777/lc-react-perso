import React, { useReducer } from "react";
import "./App.css";
import Wilder from "./Wilder";
import AddWilder from "./AddWilder";
import appReducer from "./reducers/appReducer";
import AppContext from "./context/AppContext";
import { Success } from "./styles/form-elements";
import {
  CardRow,
  Container,
  Footer,
  Header,
  ShowButton,
} from "./styles/elements";
import { ReactComponent as PlusCircle } from "./icons/add-circle.svg";
import { ReactComponent as MinusCircle } from "./icons/minus-circle.svg";
import useFetchWilders from "./hooks/useFetchWilders";

const initialState = {
  showAddForm: false,
  successMessage: "",
  wilders: [],
};

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  useFetchWilders(dispatch);

  return (
    <div>
      <Header>
        <Container>
          <h1>Wilders Book</h1>
        </Container>
      </Header>
      <Container>
        <AppContext.Provider value={dispatch}>
          <ShowButton
            onClick={() => dispatch({ type: "TOGGLE_SHOW_ADD_FORM" })}
          >
            {state.showAddForm ? <MinusCircle /> : <PlusCircle />}
          </ShowButton>
          {state.showAddForm ? (
            <AddWilder />
          ) : (
            state.successMessage !== "" && (
              <Success>{state.successMessage}</Success>
            )
          )}
        </AppContext.Provider>
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
