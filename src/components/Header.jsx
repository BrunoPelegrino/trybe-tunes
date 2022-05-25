import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
state = {
  user: '',
  loadingPage: false,
}

componentDidMount = async () => {
  this.setState({ loadingPage: true });
  const setUser = await getUser();
  this.setState({ user: setUser.name,
    loadingPage: false,
  });
}

render() {
  const { user, loadingPage } = this.state;
  return loadingPage ? <Loading /> : (
    <header data-testid="header-component">
      <Link data-testid="link-to-search" to="/search">Ir para pesquisa</Link>
      <Link data-testid="link-to-favorites" to="/favorites">Ir para favoritos</Link>
      <Link data-testid="link-to-profile" to="/profile">Ir para perfil</Link>
      <p data-testid="header-user-name">
        {user}
      </p>
    </header>
  );
}
}

export default Header;
