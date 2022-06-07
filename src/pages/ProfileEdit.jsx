import { Link } from 'react-router-dom';
import React from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    loading: false,
    name: '',
    email: '',
    image: '',
    description: '',
    btnValidate: false,
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({
      loading: false,
      name: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
    });
  }

  buttonValidate = () => {
    const { name, email, image, description } = this.state;
    const valid = 1;
    if (name.length >= valid && email.length >= valid && image.length >= valid
      && description.length >= valid) {
      this.setState({ btnValidate: false });
    } else {
      this.setState({ btnValidate: true });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value }, this.buttonValidate);
  }

  saveBtn = async () => {
    const { name, email, image, description } = this.state;
    this.setState({ loading: true });
    await updateUser();
    this.setState({
      name,
      email,
      image,
      description,
    });
  }

  render() {
    const { loading, description, name, image, email, btnValidate } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading />
          : (
            <form>
              <label htmlFor="edit-input-name">
                Nome:
                <input
                  name="name"
                  onChange={ this.handleChange }
                  value={ name }
                  type="text"
                  data-testid="edit-input-name"
                />
              </label>
              <label htmlFor="edit-input-email">
                Email:
                <input
                  name="email"
                  onChange={ this.handleChange }
                  value={ email }
                  type="text"
                  data-testid="edit-input-email"
                />
              </label>
              <label htmlFor="edit-input-description">
                Descrição:
                <input
                  name="description"
                  onChange={ this.handleChange }
                  value={ description }
                  type="text"
                  data-testid="edit-input-description"
                />
              </label>
              <label htmlFor="edit-input-image">
                Imagem de perfil:
                <img src={ image } alt={ name } />
                <input
                  onChange={ this.handleChange }
                  name="image"
                  value={ image }
                  type="text"
                  data-testid="edit-input-image"
                />
              </label>
              <Link to="/profile">
                <button
                  onClick={ this.saveBtn }
                  data-testid="edit-button-save"
                  type="button"
                  disabled={ btnValidate }
                >
                  Salvar
                </button>
              </Link>
            </form>
          )}
      </div>
    );
  }
}

export default ProfileEdit;
