import {NavLink} from "react-router-dom"
import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUser";

export const FeedToggler = ({tagName}: {tagName?: string}) => {
    const [currentUserState] = useContext<any>(CurrentUserContext)
    return (
        <div className="feed-toggle">
            <ul className="nav nav-pills outline-active">
                {currentUserState.isLoggedIn && (<li className="nav-item">
                    <NavLink to="/feed" className="nav-link">
                        Your feed
                    </NavLink>
                </li>)}
                <li className="nav-item">
                    <NavLink to="/" className="nav-link" exact>
                        Global feed
                    </NavLink>
                </li>
                {tagName && (
                    <li className="nav-item">
                        <NavLink to={`/tags/${tagName}`} className="nav-link">
                            <i className="ion-pound">

                            </i>
                            {tagName}
                        </NavLink>
                    </li>
                )}
            </ul>
        </div>
    )
}
