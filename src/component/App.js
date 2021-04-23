import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap'

import { Login } from './Login';
import { Footer } from './Footer';
import { Home } from './Home';
import { Header } from './Header';
import { Register } from './Register';
import { Dashboard } from './Dashboard';
import { ForgotPassword } from './ForgotPassword';
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

            <Container className='d-flex align-items-center justify-content-center' style={{marginTop: '50px'}}>
              <div className='w-100' style={{ maxWidth: '500px'}}>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/forgot-password' component={ForgotPassword} />
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
              </div>
            </Container>

          </AuthProvider>
        </Switch>
      </Router>

      <Footer />
    </>
  );
}

export default App;
