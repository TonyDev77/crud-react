import React from "react";
import "./main.css"
import Header from "./Header";

const Main = (props) => {
    return (
        <>
            <Header />
            <main className="content">
                Conteúdo
            </main>
        </>
    )
}

export default Main;