import React from "react";
import "./logo.css"
import {ReactComponent as LogoImage} from "../../assets/imgs/logo.svg"
import { Link } from "react-router-dom";

const Logo = (props) => {
    return (
        <aside className="logo">
            <Link to="/" className="logo">
                <LogoImage alt="logo" className="shadowImage"/>
            </Link>
        </aside>
    )
}

export default Logo;