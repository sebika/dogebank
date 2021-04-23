import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Login } from './Login';
import { Footer } from './Footer';
import { Home } from './Home';
import { Header } from './Header';
import { Register } from './Register';
import { Dashboard } from './Dashboard';
import { PrivateRoute } from './PrivateRoute';
import { AuthProvider } from '../contexts/AuthContext';

function App() {
  return (
    <>
      <Header />

      <Router>
        <Switch>
          <AuthProvider>
            <Route exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
          </AuthProvider>
        </Switch>
      </Router>

      <Footer />
    </>
  );
}

export default App;
