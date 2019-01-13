import React from "react";
import { createBrowserHistory } from 'history';
import { Switch, Router, Route } from "react-router-dom";

export const history = createBrowserHistory();

import SubmitData from "../components/SubmitData"
import Leaderboard from "../components/Leaderboard"
import UserRegister from "../components/UserRegister"
import Search from "../components/Search"
import UserList from "../components/UserList"

export default () => (
    <Router history={history}>
        <Switch>
            <Route path="/submit" component={SubmitData} exact />
            <Route path="/" component={Leaderboard} exact />
            <Route path="/register" component={UserRegister} exact />
            <Route path="/search" component={Search} exact />
            <Route path="/userlist" component={UserList} exact />
        </Switch>
    </Router>
);