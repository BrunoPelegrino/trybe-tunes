import React from 'react';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
// import requisito from '../images/requisito.png';

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
      <div
        // class="d-flex justify-content-center align-items-center"
        data-testid="page-login"
      >
        <form>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="login"
              onChange={ this.handleChange }
              login={ login }
              data-testid="login-name-input"
              type="text"
            />
          </InputGroup>
          <Button
            className="btnLogin"
            variant="success"
            onClick={ this.handleClick }
            disabled={ buttonDisabled }
            data-testid="login-submit-button"
            type="button"
          >
            Login
          </Button>
          { loadingPage && <Loading /> }
          { redirect && <Redirect to="/search" /> }
        </form>
      </div>
    );
  }
}

export default Login;
