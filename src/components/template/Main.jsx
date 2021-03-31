import React from "react";
import "./main.css"
import Header from "./Header";

const Main = (props) => {
    return (
        <>
            <Header {...props} />
            <main className="content container-fluid">
                <div className="p3 mt-3">
                    {props.children}
                </div>
            </main>
        </>
    )
}

export default Main;