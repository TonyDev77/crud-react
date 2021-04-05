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

    state = {...initialState } // "state" override the method in React.Component

    componentWillMount() {
        axios(baseURL).then(resp => {
            this.setState({list: resp.data})
        })
    }

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

    getUpdatedList(userReceived, add = true) {
        const list = this.state.list.filter(u => u.id !== userReceived.id); // remove user from list
        if (userReceived)
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
                            <label>Email</label>
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

    load(user) {
        this.setState({ user });
    }

    remove(user) {
        axios.delete(`${baseURL}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false);
            this.setState({ list });
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>{ this.renderRows() }</tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map((e) => {
            return(
                <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>
                        <button className="btn btn-warning" onClick={ () => this.load(e) }>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={ () => this.remove(e) }>
                            <i className="fa fa-trash" ></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps }>
                { this.renderForm() }
                { this.renderTable() }
            </Main>
        )
    }

}

export default UserCrud;

