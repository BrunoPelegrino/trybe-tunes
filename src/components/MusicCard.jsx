import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    checked: false,
    favmusic: [],
  }

  componentDidMount() {
    this.getFav();
  }

  verifyFav = () => {
    const { music: { trackId } } = this.props;
    const { favmusic } = this.state;
    const verify = favmusic.some((id) => id.trackId === trackId);
    this.setState({
      loading: false,
      checked: verify,
    });
  }

  getFav = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({
      loading: true,
      favmusic: favorites,
    }, () => this.verifyFav());
  }

  handleChange = async () => {
    const { music: { trackId } } = this.props;
    const { checked } = this.state;
    if (checked) {
      this.setState({ loading: true });
      await removeSong(trackId);
      this.setState({ checked: false,
        loading: false,
      });
    } if (!checked) {
      this.setState({ loading: true });
      await addSong(trackId);
      this.setState({ loading: false,
        checked: true,
      });
    }
  }

  render() {
    const { music } = this.props;
    const { loading, checked } = this.state;
    const { trackId, trackName, previewUrl } = music;
    const loadingElement = <Loading />;
    const musics = (
      <div>
        { trackName && (
          <div>
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
