import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom'
import  ChatPage  from '../pages/ChatPage'
import AuthRouter from './AuthRouter'

function AppRouter(){
    return (
      <Router>
        <div>
          <Switch>
              <Route path="/auth" component={AuthRouter} />
              <Route exact path="/" component={ChatPage}/>
              <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    )
}

export default AppRouter;