import React, { Component } from "react";
import axios from "axios";

import Main from "../template/Main";

const headerProps = {
    icon: "users",
    title: "Usuários",
    subtitle: "Cadastro de usuários: Incluir, Listar, Alterar e Excluir!"
}

const baseURL = "http://localhost:3001/users";

const initialState = {
    user: {
        name: "",
        email: "",
    },
    list: []
}

class UserCrud extends Component {

    state = { ...initialState } // "state" sobrescreve o método em React.Component

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user;
        const method = user.id ? "put" : "post";
        const url = user.id ? `${baseURL}/${user.id}` : baseURL;
        axios[method](url, user)
            .then((resp) => {
                const updatedList = this.getUpdatedList(resp.data);
                this.setState({
                    user: initialState.user,
                    list: updatedList
                })
            })
    }

    getUpdatedList(user) {
        const list = this.state.list.filter(u => u.id !== user.id); // remove usuário da lista
        list.unshift(user); // reinsere na 1º posição
        return list;
    }


    render() {
        return (
            <Main {...headerProps}>
                Cadastro de Usuários
            </Main>
        )
    }
}

export default UserCrud;

