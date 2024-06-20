import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.css"; // Ensure this import includes the custom CSS
import logo from "./img/scholarflow_logo.png";
import "./Login.css";
import axios from 'axios';

const Login = () => {
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');

    const history = useHistory();

    async function Submit(e) {
        e.preventDefault();

        try {

            await axios.post ('http://localhost:3000/login', {
                email,
                password
        })
        .then(res=>{
            if(res.data = "exist"){
                history.push('/Homepage')
            }

        })
    } 
        catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="fullscreen-container">
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={Submit}>
                    <div>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e)=> SetEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e)=> SetPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                    <div className="create-acc">
                        <p>Don't have an account yet? <Link to='/SignUp'>Create one</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login
