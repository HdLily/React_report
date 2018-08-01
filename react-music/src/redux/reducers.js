import { combineReducers } from 'redux';
import * as ActionTypes from './actionTypes'; //定义动作 类型 类似vue里的mutation




const initialState = {
    song: {}, //状态 
    songs: [],
    showStatus: false, //播放列表
    

}

function song(song = initialState.song, action ) {
    switch(action.type) {
        case ActionTypes.CHANGE_SONG:
          return action.song
        default:
          return song
    }
}

function showStatus(showStatus = initialState.showStatus, action) {
    switch(action.type) {
        case ActionTypes.SHOW_PLAYER:
        return action.showStatus;
      default:
        return showStatus;
    }
}

// action 形参
// initialState.songs 
function songs(songs = initialState.songs, action) {
    switch (action.type) {
        case ActionTypes.SET_SONGS:
          return action.songs;
        case ActionTypes.REMOVE_SONG_FROM_LIST:
          return songs.filter(song => song.id !== action.id);
        default:
          return songs
    }
}

// combineReducers 合并多个 
const reducer = combineReducers({
    song,
    songs,
    showStatus
});


export default reducer