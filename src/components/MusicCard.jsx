import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    // loading: false,
    // checkbox: false,
    // favMusic: [],
  }

  handleChange = async () => {
    const { musics } = this.props;
    const favMusic = await addSong(musics);
    console.log(favMusic);
  }

  render() {
    const { music } = this.props;
    const { trackId } = music;
    return (
      <div>
        { music.trackName && (
          <div>
            <p>
              { music.trackName }
            </p>
            <audio data-testid="audio-component" src={ music.previewUrl } controls>
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
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                onChange={ this.handleChange }
              />
            </label>
          </div>)}
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  music: PropTypes.object,
}.isRequired;
