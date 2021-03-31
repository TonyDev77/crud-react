import React from "react";
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.min.css"
import Logo from "../components/template/Logo";
import Nav from "../components/template/Nav";
import Footer from "../components/template/Footer";
import Home from "../components/home/Home";

const App = (props) => {
    return (
        <div className="app">
            <Logo />
            <Nav />
            <Home />
            <Footer />
        </div>
    )
}

export default App;