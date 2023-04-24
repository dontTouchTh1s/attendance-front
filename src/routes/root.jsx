import {Link, Outlet} from "react-router-dom";

export default function Root() {
    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <p><Link to={'/login'}>login</Link></p>

                <p><Link to={'/sing-up'}>sing up</Link></p>

            </div>
            <Outlet>
                
            </Outlet>
        </>
    );
}