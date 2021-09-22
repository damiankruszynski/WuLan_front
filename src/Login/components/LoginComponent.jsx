import React, { useState } from 'react';
import LoginService from '../services/LoginService';


function LoginComponent(props){

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [messageError, setMessageError] = useState(null);


  function logiIn(e) {
    e.preventDefault();

    if (userName === '' || password === '') {
      return;
    }
    let loginRequest = {
      username: userName,
      password: password
    };
    LoginService.logIn(loginRequest)
      .then(
        () => {
          props.history.push("/home");  
          window.location.reload();
        },
        error => {
          if (error.message.indexOf("Network Error") !== -1) {
            setMessageError("Serwer nie odpowiada!");
            console.log(error.message);
          } else {
            setMessageError("Błędne dane logowania!");
            console.log(error.message);
          }
          
        });
  }

  function errorMessage() {
    if (messageError) {
      return (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {
              messageError
            }
          </div>
        </div>
      )
    } else {
      return null;
    }
  }

  function changeUserNameHandler(e) {
    setUserName(e.target.value);
  }

  function changePasswordHandler(e) {
    setPassword(e.target.value);
  }

    return (
      <div className="App">
      <header className="App-header">
          <form className="form-signin">
            <div className="d-sm-flex flex-sm-column">
              <label htmlFor="username" className="flex-sm-row">Login</label><br></br>
              <input type="username"
                id="username"
                className="flex-sm-row"
                value={userName}
                onChange={changeUserNameHandler}
                placeholder="Login"
                required
                autoFocus />
              <br></br>
              <label htmlFor="password" className="flex-sm-row">Hasło</label><br></br>
              <input type="password"
                id="password"
                className="flex-sm-row"
                placeholder="Hasło"
                value={password}
                onChange={changePasswordHandler}
                required />
               <div>
                {
                  errorMessage()
                }
              </div>              
                <button className="btn-primary mt-4" type="submit" onClick={logiIn} >Zaloguj</button>
            </div>
          </form>
        </header>
        </div>
    );
}

export default LoginComponent;