import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import { Footer } from './Footer'
import { Header } from './Header'
import { PrivateRoute } from './PrivateRoute'
import { AuthProvider } from '../contexts/AuthContext'

import { LoginView } from './views/LoginView'
import { HomeView } from './views/HomeView'
import { RegisterView } from './views/RegisterView'
import { DashboardView } from './views/DashboardView'
import { ForgotPasswordView } from './views/ForgotPasswordView'
import { UpdateProfileView } from './views/UpdateProfileView'
import { AskQuestionView } from './views/AskQuestionView'
import { AccountCreationRequestView } from './views/AccountCreationRequestView'
import { CreateBankAccountView } from './views/CreateBankAccountView'
import { CreateTransactionView } from './views/CreateTransactionView'
import { BankAccountView } from './views/BankAccountView'
import { TransactionView } from './views/TransactionView'
import { ProfileView} from './views/ProfileView'

function App() {
  return (
    <>
      <Router>
        <Switch>
          <AuthProvider>
            <Header />

            <Route exact path='/' component={HomeView} />
            <PrivateRoute exact path='/dashboard' component={DashboardView} />

            <Container className='d-flex align-items-center justify-content-center' style={{marginTop: '10px'}}>
              <div className='w-100' style={{ maxWidth: '800px'}}>
                <PrivateRoute path='/account-creation-requests' component={AccountCreationRequestView}
                  check={(currentUser) =>  currentUser.db.get('is_helpdesk')} />
                <PrivateRoute path='/transactions' component={TransactionView} />
              </div>
            </Container>

            <Container className='d-flex align-items-center justify-content-center' style={{marginTop: '50px'}}>
              <div className='w-100' style={{ maxWidth: '500px'}}>
                <Route path='/register' component={RegisterView} />
                <Route path='/login' component={LoginView} />
                <Route path='/forgot-password' component={ForgotPasswordView} />
                <PrivateRoute path='/update-profile' component={UpdateProfileView} />
                <PrivateRoute path='/profile' component={ProfileView} />
                <PrivateRoute path='/create-bank-account' component={CreateBankAccountView} />
                <PrivateRoute path='/create-transaction' component={CreateTransactionView} />
                <PrivateRoute path='/support' component={AskQuestionView} />
                <PrivateRoute path='/show-bank-account' component={BankAccountView} />
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
