import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import { Login } from './Login'
import { Footer } from './Footer'
import { Home } from './Home'
import { Header } from './Header'
import { Register } from './Register'
import { Dashboard } from './Dashboard'
import { ForgotPassword } from './ForgotPassword'
import { UpdateProfile } from './UpdateProfile'
import { PrivateRoute } from './PrivateRoute'
import { AskQuestion } from './AskQuestion'
import { AccountCreationRequest } from './AccountCreationRequest'
import { AuthProvider } from '../contexts/AuthContext'
import { CreateBankAccount } from './CreateBankAccount'
import { CreateTransaction } from './CreateTransaction'

function App() {
  return (
    <>
      <Router>
        <Switch>
          <AuthProvider>
            <Header />

            <Route exact path='/' component={Home} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />

            <Container className='d-flex align-items-center justify-content-center' style={{marginTop: '10px'}}>
              <div className='w-100' style={{ maxWidth: '800px'}}>
                <PrivateRoute path='/account-creation-requests' component={AccountCreationRequest} />
              </div>
            </Container>

            <Container className='d-flex align-items-center justify-content-center' style={{marginTop: '50px'}}>
              <div className='w-100' style={{ maxWidth: '500px'}}>
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
                <Route path='/forgot-password' component={ForgotPassword} />
                <PrivateRoute path='/update-profile' component={UpdateProfile} />
                <PrivateRoute path='/create-bank-account' component={CreateBankAccount} />
                <PrivateRoute path='/create-transaction' component={CreateTransaction} />
                <PrivateRoute path='/support' component={AskQuestion} />
              </div>

            </Container>

          </AuthProvider>
        </Switch>
      </Router>

      <Footer />
    </>
  )
}

export default App
