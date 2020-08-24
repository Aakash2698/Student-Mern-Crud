import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StudentList from "./Components/StudentList/StudentList";
import NewStudent from "./Components/NewStudent/NewStudent";
import { Provider } from "react-redux";
import configureStore from "./Store/Store";
import UpdateStudent from "./Components/UpdateStudent/UpdateStudent";

function App() {
  return (
    <Provider store={configureStore()}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={StudentList} />
          <Route exact path="/home" component={StudentList} />
          <Route exact path="/new-student" component={NewStudent} />
          <Route
            exact
            path="/update-student/:id"
            render={(props) => <UpdateStudent {...props} />}
          />{" "}         
          
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
