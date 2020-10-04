
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Login from './components/Login/Login';
import Shop from './components/Shop/Shop';
import { PrivateRoute } from './components/PriveteRout/PriveteRout';
import UserContext from './UserContext'


const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff"
  },
  media: {
    height: 400
  },
}));

const App = () => {
  const [user, setUser] = useState();

  const classes = useStyles();


  return (
    <UserContext.Provider value={[user, setUser]}>

      <div className="App">
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>
            <Typography variant="h6" color="primary" >
              Book Shop
          </Typography>
          </Toolbar>
        </AppBar>
        <Router>
          <div>
            <Switch>
              <Route exact path="/">
                <PrivateRoute component={Shop}></PrivateRoute>
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/shop">
                <PrivateRoute component={Shop}></PrivateRoute>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;



