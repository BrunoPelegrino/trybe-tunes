import React from 'react';
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
      <p data-testid="header-user-name">
        {user}
      </p>
    </header>
  );
}
}

export default Header;
