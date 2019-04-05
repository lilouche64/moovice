import React from "react";
import { NavLink } from "react-router-dom";

class Navbar extends React.Component{   

    render(){
        return(
            <div>

                {/* <li><NavLink to="/">This week</NavLink></li>
                <li><NavLink to="/Popular">Popular</NavLink></li>
                <li><NavLink to="/my-list">My list</NavLink></li> */}

                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <NavLink className="navbar-brand" href="/">Moovice</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                        <a className="nav-item nav-link" href="/">This week <span class="sr-only">(current)</span></a>
                        <a className="nav-item nav-link" href="/Popular">Popular</a>
                        <a className="nav-item nav-link" href="/my-list">My list</a>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
export default Navbar;