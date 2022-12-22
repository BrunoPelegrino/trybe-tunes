import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  state = {
    loading: false,
    name: '',
    email: '',
    image: '',
    description: '',
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

  render() {
    const { loading, description, name, image, email } = this.state;
    return (
      <div style={ { background: `url(${requisito}` } } data-testid="page-profile">
        <Header />
        {loading ? <Loading />
          : (
            <div>
              <img src={ image } alt={ name } data-testid="profile-image" />
              <h2>Nome:</h2>
              <p>{ name }</p>
              <h2>Email:</h2>
              <p>{ email }</p>
              <h2>Descrição:</h2>
              <p>{ description }</p>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
