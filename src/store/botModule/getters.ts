import { GetterTree } from 'vuex';
import {RootState} from '../index';
import {BotsState} from './state';
import {Bot} from "@/types/common";


const getters: GetterTree<BotsState, RootState> = {
    bots(state) {
        return state.bots;
    },

    currentBots: state => (botId: number): Bot | undefined => {
        return state.bots.find(item => item.id===botId);
    },

};

export default getters;
