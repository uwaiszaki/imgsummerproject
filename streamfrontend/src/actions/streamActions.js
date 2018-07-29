import { PLAY_CHANGE , TIME_CHANGE , MUTE_CHANGE , URL_CHANGE , VOL_CHANGE  , DUR_CHANGE} from './actiontypes.js';

export const playpauseChange = (playing) => ({
    type: PLAY_CHANGE,
    payload:playing
});
export const timeChange = (currtime) => ({
    type: TIME_CHANGE,
    payload:currtime
});
export const muteChange = (muted) => ({
    type: MUTE_CHANGE,
    payload:muted
});

export const urlChange = (url) => ({
    type: URL_CHANGE,
    payload:url
});

export const volChange = (volume) => ({
	type:VOL_CHANGE,
	payload:volume
	});

export const durChange = (duration) => ({
	type:DUR_CHANGE,
	payload:duration
	});