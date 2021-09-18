import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

import { ChatPage } from "../pages/ChatPage";
import { AuthRouter } from "./AuthRouter";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  const { auth, verificaToken } = useContext(AuthContext);

  //console para ver el tracking de la verificacion del token y la autenticancion
  //console.log(auth)

  useEffect(() => {
    //la fn verificaToken() se encargara de renovar el token llamando al api /renew
    //(el cual renueva el token y retorna la info del user)
    verificaToken();
  }, [verificaToken]);

  //si no esta autenticado checking siempre va a ser true
  if (auth.checking) {
    return <h1>Espere por favor</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          {/* <Route path="/auth" component={ AuthRouter } /> */}
          <PublicRoute
            isAuthenticated={auth.logged}
            path="/auth"
            component={AuthRouter}
          />
          <PrivateRoute
            exact
            isAuthenticated={auth.logged}
            path="/"
            component={ChatPage}
          />
          {/* <Route exact path="/" component={ ChatPage } /> */}

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
