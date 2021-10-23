import {Switch, Route} from "react-router-dom";
import {Article} from "./article/Article";
import {GlobalFeed} from "./globalFeed/GlobalFeed";
import {Authentication} from "./authentication/Authentication";
import {TagFeed} from "./tagFeed/TagFeed";

export const Routes = () => {
    return (
        <Switch>
            <Route path={'/'} component={GlobalFeed} exact/>
            <Route path={'/tags/:slug'} component={TagFeed}/>
            <Route path={'/login'} component={Authentication}/>
            <Route path={'/register'} component={Authentication}/>
            <Route path={'/articles/:slug'} component={Article}/>
        </Switch>
    )
}