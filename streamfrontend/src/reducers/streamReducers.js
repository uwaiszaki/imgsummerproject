import {PLAY_CHANGE , TIME_CHANGE , MUTE_CHANGE , URL_CHANGE} from '../actions/streamActions.js';

export default function streamReducer(state={
    url:'',
    playing:true,
    muted:false ,
    currtime:0
}, action) => {
    switch (action.type) {
        case PLAY_CHANGE:
        return {
            ...state,
            playing:action.playing 
        };
        case TIME_CHANGE:
        return {
            ...state,
            currtime: action.currtime
        };
        case MUTE_CHANGE:
        return {
            ...state,
            muted: action.muted
        };
        case URL_CHANGE:
        return {
            ...state,
            url: action.url
        };

        default:
        return state;
    }
};