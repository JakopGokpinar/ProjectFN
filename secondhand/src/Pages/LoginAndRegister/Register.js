import './Register.css';
import axios from 'axios'

import { Link } from 'react-router-dom';
import { useState } from "react";

axios.defaults.withCredentials = true;

function Register() {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[message, setMessage] = useState("");

    const insertUser = () =>  { 
        var user = {
            email: email,
            password: password
        }

        axios.post('http://localhost:3080/user/register', user)
            .then(res => {
                console.log(res.data);
                setMessage(res.data.message);
            });
    }

    return(
        <div>
            <form className="registerForm" >
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" required onChange={(event) => setEmail(event.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword5" className="form-label">Password</label>
                    <input type="password" className="form-control" required onChange={(event) => setPassword(event.target.value)}></input>
                </div>
                <button type="button" className="btn btn-primary mx-auto d-block" onClick={() => insertUser()}>Register</button>
                <p>{message}</p>
                <Link to="/login">Login</Link>
            </form>
        </div>
    )
}

export default Register;