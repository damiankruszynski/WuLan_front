import React, { Component } from 'react';
import LoginService from '../services/LoginService';


class LoginComponent extends Component {

  constructor(props) {
    super(props)

    this.state = { username: '', password: '', message: '' };
    this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.logiIn = this.logiIn.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
  }



  changeUserNameHandler(event) {
    this.setState({ username: event.target.value });
    this.setState({ message: '' });
  }

  changePasswordHandler(event) {
    this.setState({ password: event.target.value });
    this.setState({ message: '' });
  }

  logiIn(e) {
    e.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      return;
    }
    let loginRequest = { username: this.state.username, password: this.state.password };
    LoginService.logIn(loginRequest)
      .then(
        () => {
          this.props.history.push({ pathname: '/home', state: {stack : [] }});  
          window.location.reload();
        },
        error => {
          this.setState({ message: 'Błędne dane logowania.' });
          this.render();
        });
  }

  errorMessage() {
    if (this.state.message !== '') {
      return (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {this.state.message}
          </div>
        </div>
      )
    }
  }


  render() {
    return (
      <div className="App">
      <header className="App-header">
          <form className="form-signin">
            <div className="d-sm-flex flex-sm-column">
              <label htmlFor="username" className="flex-sm-row">Login</label><br></br>
              <input type="username"
                id="username"
                className="flex-sm-row"
                value={this.state.username}
                onChange={this.changeUserNameHandler}
                placeholder="Login"
                required
                autoFocus />
              <br></br>
              <label htmlFor="password" className="flex-sm-row">Hasło</label><br></br>
              <input type="password"
                id="password"
                className="flex-sm-row"
                placeholder="Hasło"
                value={this.state.password}
                onChange={this.changePasswordHandler}
                required />
               <div>
                {
                  this.errorMessage()
                }
              </div>              
                <button className="btn-primary mt-4" type="submit" onClick={this.logiIn} >Zaloguj</button>
            </div>
          </form>
        </header>
        </div>
    );
  }
}

export default LoginComponent;