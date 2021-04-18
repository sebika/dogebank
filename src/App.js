import firebase from "firebase/app";

function App() {
  const firebaseApp = firebase.apps[0];

  return (
    <div className="App">

      <h1>React & Firebase</h1>
      <code>
        <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre>
      </code>

    </div>
  );
}

export default App;
