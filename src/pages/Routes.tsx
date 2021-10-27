import {Route, Switch} from "react-router-dom";
import {Article} from "./article/Article";
import {GlobalFeed} from "./globalFeed/GlobalFeed";
import {Authentication} from "./authentication/Authentication";
import {TagFeed} from "./tagFeed/TagFeed";
import {YourFeed} from "./YourFeed/YourFeed";
import {CreateArticle} from "./createArticle/CreateArticle";
import {EditArticle} from "./editArticle/EditArticle";
import {Settings} from "./settings/Settings";

export const Routes = () => {
    return (
        <Switch>
            <Route path={'/'} component={GlobalFeed} exact/>
            <Route path={'/settings'} component={Settings}/>
            <Route path={'/articles/new'} component={CreateArticle}/>
            <Route path={'/articles/:slug/edit'} component={EditArticle}/>
            <Route path={'/feed'} component={YourFeed}/>
            <Route path={'/tags/:slug'} component={TagFeed}/>
            <Route path={'/login'} component={Authentication}/>
            <Route path={'/register'} component={Authentication}/>
            <Route path={'/articles/:slug'} component={Article}/>
        </Switch>
    )
}