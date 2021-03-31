import React from "react";
import "./logo.css"
import {ReactComponent as LogoImage} from "../../assets/imgs/logo.svg"

const Logo = (props) => {
    return (
        <aside className="logo">
            <a href="/" className="logo">
                <LogoImage alt="logo" className="shadowImage"/>
            </a>
        </aside>
    )
}

export default Logo;