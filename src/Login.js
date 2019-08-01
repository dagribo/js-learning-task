import React from 'react';
import './App.css';
import './Login.css'
import AuthHelperMethods from './Auth'

class Login extends React.Component {
    state = {
        username: "",
        password: ""
    }

    Auth = new AuthHelperMethods();
    _handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleFormSubmit = async e => {
        e.preventDefault();
        try {
            const res = await this.Auth.login(this.state.username, this.state.password);
            if (!res) {
                return alert("Sorry, those creditials don't exist!");
            }
            this.props.history.replace("/employees");
        } catch(err) {
            alert(err);
        }
    }

    componentWillMount() {
        if (this.Auth.loggedIn()){
            this.props.history.replace('/employees');
        }  
    }

    render() {
        return (
            <React.Fragment>
                <div className="main-wrapper">
                    <div className="box">
                        <div className="box-header">
                            <h1>Login</h1>
                        </div>
                        <form className="box-form">
                            <input
                                className="form-item"
                                placeholder="Username"
                                name="username"
                                type="text"
                                onChange={this._handleChange}
                            />
                            <input
                                className="form-item"
                                placeholder="Password"
                                name="password"
                                type="password"
                                onChange={this._handleChange}
                            />
                            <button className="form-submit" onClick={this.handleFormSubmit}>Login</button>
                        </form>
                    </div>
                </div>
                
            </React.Fragment>
        );
    }
}
export default Login;