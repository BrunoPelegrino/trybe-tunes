import React from 'react';

class Login extends React.Component {
  state = {
    buttonDisabled: true,
    login: '',
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

  render() {
    const { buttonDisabled, login } = this.state;
    return (
      <div data-testid="page-login">
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
          disabled={ buttonDisabled }
          data-testid="login-submit-button"
          type="button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
