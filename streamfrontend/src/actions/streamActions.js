export const  PLAY_CHANGE = 'PLAY_CHANGE'; 
export const TIME_CHANGE = 'TIME_CHANGE';
export const MUTE_CHANGE = 'MUTE_CHANGE';
export const URL_CHANGE = 'URL_CHANGE';

export const playpauseChange = (playing = true) => ({
    type: PLAY_CHANGE,
    playing
});
export const timeChange = (currtime = 0) => ({
    type: TIME_CHANGE,
    currtime
});
export const muteChange = (muted=false) => ({
    type: MUTE_CHANGE,
    muted
});

export const urlChange = (url='') => ({
    type: URL_CHANGE,
    url
});