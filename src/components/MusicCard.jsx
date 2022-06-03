import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    checked: false,
    favMusic: [],
  }

  handleChange = async () => {
    const { musics } = this.props;
    const { checked } = this.state;
    if (checked) {
      this.setState({ checked: false });
    } if (!checked) {
      this.setState({ loading: true });
      await addSong({ musics });
      this.setState({ loading: false,
        checked: true,
      });
    }
  }

  componentDidMount = async () => {
    const { musics } = this.props;
    const favorites = await getFavoriteSongs({ musics });
    console.log(favorites);
    this.setState({ favMusic: favorites,
    });
  }

  /* check = () => {
    if (checked === true) {
      this.setState({ checked: false });
    }
  } */

  render() {
    const { music } = this.props;
    const { loading, checked, favMusic } = this.state;
    const { trackId, trackName, previewUrl } = music;
    const loadingElement = <Loading />;
    const musics = (
      <div>
        { trackName && (
          <div>
            <p>{ favMusic }</p>
            <p>
              { trackName }
            </p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label
              htmlFor="trackId"
            >
              <br />
              Favoirta
              <input
                checked={ checked }
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                onChange={ this.handleChange }
              />
            </label>
          </div>)}
      </div>
    );
    return (
      <div>
        {!loading ? musics : loadingElement}
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  music: PropTypes.object,
}.isRequired;
