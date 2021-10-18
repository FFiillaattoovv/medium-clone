import {Switch, Route} from "react-router-dom";
import {Article} from "./article/Article";
import {GlobalFeed} from "./globalFeed/GlobalFeed";

export const Routes = () => {
    return (
        <Switch>
            <Route path={'/'} component={GlobalFeed} exact/>
            <Route path={'/articles/:slug'} component={Article}/>
        </Switch>
    )
}