import {Switch, Route} from "react-router-dom";
import {Article} from "./article/Article";
import {GlobalFeed} from "./globalFeed/GlobalFeed";
import {Authentication} from "./authentication/Authentication";

export const Routes = () => {
    return (
        <Switch>
            <Route path={'/'} component={GlobalFeed} exact/>
            <Route path={'/login'} component={Authentication}/>
            <Route path={'/register'} component={Authentication}/>
            <Route path={'/articles/:slug'} component={Article}/>
        </Switch>
    )
}