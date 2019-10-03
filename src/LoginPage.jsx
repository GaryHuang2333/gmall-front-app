import React from 'react';
import ReactDOM from 'react-dom';

class Login extends React.Component {
    render() {
        return (
            <div className="login">
                <h1>Login Page</h1>
                <label>Please Login</label>
                <form method="get" action="http://localhost:8080/gmall/login/seller">
                    <div>UserName : <input type="text" name="username" placeholder="please input username" /></div>
                    <div>PassWord : <input type="password" name="password" placeholder="please input password" /></div>
                    <div><input type="submit" value="login" /></div>
                </form>
            </div>
        );
    }
}

export default Login;