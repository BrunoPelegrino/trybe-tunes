import { Link } from 'react-router-dom';
import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    buttonDisabled: true,
    search: '',
    albuns: [],
    loading: false,
    searchInput: '',
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

  handleClick = async () => {
    const { search } = this.state;
    this.setState({ loading: true });
    const getAlmbum = await searchAlbumsAPI(search);
    this.setState((prevState) => ({
      albuns: [...getAlmbum],
      loading: false,
      search: '',
      searchInput: prevState.search,
    }));
  }

  render() {
    const { buttonDisabled, search, loading, albuns, searchInput } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading />
          : (
            <form>
              <input
                name="search"
                onChange={ this.handleChange }
                data-testid="search-artist-input"
                type="text"
                value={ search }
              />
              <button
                onClick={ this.handleClick }
                disabled={ buttonDisabled }
                data-testid="search-artist-button"
                type="button"
              >
                Pesquisar
              </button>
            </form>
          )}
        {searchInput.length > 0 && (
          <h1>
            {`Resultado de álbuns de: ${searchInput}`}
          </h1>)}
        <div>
          {albuns.length === 0
            ? 'Nenhum álbum foi encontrado'
            : (
              albuns.map((album) => (
                <div key={ album.collectionId }>
                  <p>
                    Artista:
                    {album.artistName}
                  </p>
                  <p>
                    Nome do Álbum:
                    {album.collectionName}
                  </p>
                  <p>
                    Preço:
                    {album.collectionPrice}
                  </p>
                  <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  <p>
                    Músicas:
                    {album.trackCount}
                  </p>
                  <p>
                    ID da coleção:
                    {album.collectionId}
                  </p>
                  <p>
                    ID do artista:
                    {album.artistId}
                  </p>
                  <p>
                    Data de lançamento:
                    {album.releaseDate}
                  </p>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    Ver Álbum
                  </Link>
                </div>
              )))}
        </div>
      </div>
    );
  }
}

export default Search;
