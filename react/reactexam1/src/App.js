import './App.css';
import MyHeader from './MyHeader';
import Counter from './Counter';
import Container from './Container';


function App() {

  const CountProps = {
    /* num1: 10, */
    num2: 20,
  }

  return (
    <Container>
      <div>
        <MyHeader/>
        <Counter {...CountProps} />
      </div>
    </Container>
  );
}

export default App;
