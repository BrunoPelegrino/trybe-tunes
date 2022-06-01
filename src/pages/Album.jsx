import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

// requisito(7) feito em conjunto com raphael fernandes

class Album extends React.Component {
  state = {
    musics: [],
    collectionName: '',
    artistName: '',
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({ musics,
      collectionName: musics[0].collectionName,
      artistName: musics[0].artistName,
    });
  }

  render() {
    const { musics, artistName, collectionName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="album-name">{collectionName}</h2>
        <h3 data-testid="artist-name">{artistName}</h3>

        {
          musics.map((music, index) => (
            <div key={ index }>
              <MusicCard music={ music } />
            </div>
          ))
        }
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  id: PropTypes.object,
}.isRequired;
