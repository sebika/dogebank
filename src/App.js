import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { LoginPage } from './component/LoginPage';
import { Footer } from './component/Footer';
import { Home } from './component/Home';
import { Header } from './component/Header';

function App() {
  return (
    <Router>
      <div className='App'>

        <Header />

        <div className='container'>
          <Switch>

          <Route exact path='/login'>
            <LoginPage />
          </Route>

          <Route exact path='/'>
            <Home />
          </Route>

          </Switch>
        </div>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
