import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Todo from './pages/Todo'
import Main from './pages/Main'
import Stock from './pages/Stock'
import AddressBook from './pages/AddressBook'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  let auth = localStorage.getItem('auth')
  auth = auth ? auth : false
  const [isAuth, setIsAuth] = useState(auth)

  function setAuth(a) {
    setIsAuth(a)
    localStorage.setItem('auth', a)
  }

  return (
    <Router>
      <Header isAuth={isAuth} setIsAuth={setAuth} />
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <PrivateRoute exact path='/todo' isAuth={isAuth} component={Todo} />

        <PrivateRoute
          exact
          path='/addressbook'
          isAuth={isAuth}
          component={AddressBook}
        />
        <PrivateRoute exact path='/stock' isAuth={isAuth} component={Stock} />

        <Route exact path='/login'>
          {isAuth ? (
            <Redirect to='/stock' />
          ) : (
            <Login isAuth={isAuth} setIsAuth={setAuth} />
          )}
        </Route>
        <Route exact path='/register'>
          <Register isAuth={isAuth} setIsAuth={setAuth} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
