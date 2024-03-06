import styled from "styled-components";
import { Provider } from "react-redux";
import store from "./store";
import TaskSystem from "./components/Tasks";
import { HEADER } from "./constants";

function App() {
  const {APPLICATION_HEADER} = HEADER
  return (
    <Provider store={store}>
      <Main>
        <Header>{APPLICATION_HEADER}</Header>
        <Container>
          <TaskSystem />
        </Container>
      </Main>
    </Provider>
  );
}

export default App;

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  font-weight: 800;
  background-color: #cae7e7;
`;

const Container = styled.div`
  display: flex
  flex-direction: column;
`;
