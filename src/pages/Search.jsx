import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    buttonDisabled: true,
    search: '',
  };

  buttonSearchValidate = () => {
    const { search } = this.state;
    const valid = 2;
    if (search.length >= valid) {
      this.setState({ buttonDisabled: false });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value }, this.buttonSearchValidate);
  }

  render() {
    const { buttonDisabled, search } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            name="search"
            search={ search }
            onChange={ this.handleChange }
            data-testid="search-artist-input"
            type="text"
          />
          <button
            disabled={ buttonDisabled }
            data-testid="search-artist-button"
            type="button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
