import { LoginPage } from "./component/LoginPage";
import { Header } from "./component/Header";
import { Footer } from "./component/Footer";

function App() {
  return (
    <div className="container">
      <header><Header /></header>
      <LoginPage />
      <footer><Footer /></footer>
    </div>
  );
}

export default App;
