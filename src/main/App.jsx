import React from "react";
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.min.css"
import Logo from "../components/template/Logo";
import Nav from "../components/template/Nav";
import Main from "../components/template/Main";
import Footer from "../components/template/Footer";

const App = (props) => {
    return (
        <div className="app">
            <Logo />
            <Nav />
            <Main icon="home" title="Início" subtitle="Segundo projeto React." />
            <Footer />
        </div>
    )
}

export default App;