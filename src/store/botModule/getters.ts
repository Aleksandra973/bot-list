import { GetterTree } from 'vuex';
import {RootState} from '../index';
import {BotsState} from './state';

const getters: GetterTree<BotsState, RootState> = {
    bots(state) {
        return state.bots;
    },

};

export default getters;
