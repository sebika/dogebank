import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";

function App() {
  const firebaseApp = firebase.apps[0];
  return (
    <div className="App">

      <h1>React & Firebase</h1>
      <code>
        <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre>
      </code>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
