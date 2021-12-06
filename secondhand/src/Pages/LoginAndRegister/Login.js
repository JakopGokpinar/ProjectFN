import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import './Login.css';
import { instanceAxs } from "../../api/Api";
import { login, logout } from '../../actions/LoginActions.js';
import { connect } from 'react-redux';


axios.defaults.withCredentials = true;

class Login extends React.Component{ 
    constructor(props){
        super(props);
        this.state = {
            user: {
                email: '',
                password: ''
            },
            message: 'Login message here',
            checklog: 'Check login message here',
            logout: 'Logout message here'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    } 

    handleChange = (event) => {
        let user = this.state.user
        if (event.target.name === 'email') {
            user.email = event.target.value;
        } else if (event.target.name === 'pass') {
            user.password = event.target.value;
        } 
        this.setState({ user });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.props.login(this.state.user);
    }

    checklogin = async () => {
        const response = await instanceAxs.get('/checklogin');
        console.log(response)
        if(response.data.message === "user logged in"){
            this.setState({ checklog: 'user logged in'});
            console.log(response.data.message)
        } else {
            this.setState({ checklog: 'user not logged in'});
        }
    }

    logout = () => {
        this.props.logout();
    }
    
    render(){
        return(
            <form id="login-form" onSubmit={this.handleSubmit}>
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input type="email" className="email form-control" name="email" required onChange={this.handleChange}></input>
                </div>
                <div class="mb-3">
                    <label for="inputPassword5" className="form-label">Password</label>
                    <input type="text" className="pass form-control" name="pass" required onChange={this.handleChange}></input>
                </div>             
                <button type="submit" class="btn btn-primary d-block">Login</button>
                <p>{this.state.message}</p>
                <hr/>              
                <button type='button' className="btn btn-primary d-block" onClick={this.checklogin}>Check Login</button>
                <p>{this.state.checklog}</p>
                <hr/>
                <button type='button' className="btn btn-primary d-block" onClick={this.logout}>Logout</button>
                <p>{this.state.logout}</p>
                <hr/>
                <Link to="/register">Register</Link>
            </form>
        )
    }
}

const mapDispatchToProps = {
    login, logout
}

export default connect(null, mapDispatchToProps)(Login)