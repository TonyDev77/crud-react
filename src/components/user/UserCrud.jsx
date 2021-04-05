import React, {Component} from "react";
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

    state = {...initialState} // "state" override the method in React.Component

    clear() {
        this.setState({user: initialState.user})
    }

    // Saves users in DB
    save() {
        const userReceived = this.state.user;
        const method = userReceived.id ? "put" : "post";
        const url = userReceived.id ? `${baseURL}/${userReceived.id}` : baseURL;

        axios[method](url, userReceived)
            .then((e) => {
                debugger
                const updatedList = this.getUpdatedList(e.data);
                this.setState({
                    user: initialState.user,
                    list: updatedList
                })
            })
    }

    getUpdatedList(userReceived) {
        const list = this.state.list.filter(u => u.id !== userReceived.id); // remove user from list
        list.unshift(userReceived); // inserts in first position
        return list;
    }

    // Receives data from html form | Allows edition in html field
    updateField(e) {
        const userUpdate = {...this.state.user };
        // The "[]" it's a alternative for "userUpdate.name"
        userUpdate[e.target.name] = e.target.value;
        this.setState({user: userUpdate});
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                   name="name" value={this.state.user.name}
                                   onChange={ e => this.updateField(e) }
                                   placeholder="Digite o nome..."
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>email</label>
                            <input type="text" className="form-control" name="email"
                                   value={ this.state.user.email }
                                   onChange={ e => this.updateField(e) }
                                   placeholder="Digite o email..."/>
                        </div>
                    </div>
                </div>

                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary ml-2" onClick={e => this.save(e)}>Salvar</button>
                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>Cancelar</button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}

export default UserCrud;

