import {PLAY_CHANGE , TIME_CHANGE , MUTE_CHANGE , URL_CHANGE , VOL_CHANGE , DUR_CHANGE} from '../actions/actiontypes.js';

export default function(state={
                        url:'',
                        playing:true,
                        muted:false ,
                        currtime:0 ,
                        volume:0.5,
                        duration:100,

                    }, action)
{
    switch (action.type) {
        case PLAY_CHANGE:
        return {
            ...state,
            playing:action.payload 
        };
        case TIME_CHANGE:
        return {
            ...state,
            currtime: action.payload
        };
        case MUTE_CHANGE:
        return {
            ...state,
            muted: action.payload
        };
        case URL_CHANGE:
        return {
            ...state,
            url: action.payload
        };

        case VOL_CHANGE:
        return {
            ...state,
            volume: action.payload
        };

        case DUR_CHANGE:
        return {
            ...state,
            duration: action.payload
        };
        default:
        return state;
    }
};