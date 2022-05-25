import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    buttonDisabled: true,
    login: '',
    loadingPage: false,
    redirect: false,
  };

  buttonValidate = () => {
    const { login } = this.state;
    const valid = 3;
    if (login.length >= valid) {
      this.setState({ buttonDisabled: false });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value }, this.buttonValidate);
  }

  handleClick = async () => {
    const { login } = this.state;
    this.setState({ loadingPage: true });
    await createUser({ name: login });
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { buttonDisabled, login, loadingPage, redirect } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="login-name-input">
            Login
            <input
              name="login"
              onChange={ this.handleChange }
              login={ login }
              data-testid="login-name-input"
              type="text"
            />
          </label>
          <button
            onClick={ this.handleClick }
            disabled={ buttonDisabled }
            data-testid="login-submit-button"
            type="button"
          >
            Entrar
          </button>
          { loadingPage && <Loading /> }
          { redirect && <Redirect to="/search" /> }
        </form>
      </div>
    );
  }
}

export default Login;
