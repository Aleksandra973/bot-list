import {ActionTree} from 'vuex';
import {RootState} from '../index';
import {BotsState} from './state';

import {BotService} from "../../services/idb"


const actions: ActionTree<BotsState , RootState> = {
    async getBots ({ commit }) {
        let bots = await BotService.getBots()
        commit('SET_BOTS', bots)
    },
    async saveBot ({ commit },  bot ) {
        //let bots = await BotService.getBots()
        return BotService.saveBot(bot)
    },
    async deleteBot ({ commit }, bot) {
        return BotService.deleteBot(bot)
    }
};

export default actions;
