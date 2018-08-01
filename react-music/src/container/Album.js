import { connect } from 'react-redux';
import { showPlayer, changeSong, setSongs} from '../redux/actions';
import Album from '../components/album/Album';


const mapDispatchToProps = (dispatch) => ({
    changeCurrentSong: (song) => {
        dispatch(changeSong(song));
    },
    setSongs: (songs) => {
        dispatch(setSongs(songs));
    },
    showPlayer: (status) => {
        dispatch(showPlayer(status));
    }
})


export default connect(null, mapDispatchToProps)(Album);