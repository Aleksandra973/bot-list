import {ActionTree} from 'vuex';
import {RootState} from '../index';
import {BotsState} from './state';
import {BotService} from "../../services/idb"
import {Bot} from "@/types/common";


const actions: ActionTree<BotsState , RootState> = {
    async getBots ({ commit }): Promise<void> {
        let bots: Bot[] = await BotService.getBots()
        commit('SET_BOTS', bots)
    },
    async saveBot ({ commit },  bot ): Promise<number> {
      return BotService.saveBot(bot)
    },
    async deleteBot ({ commit }, botId): Promise<void> {
        return BotService.deleteBot(botId)
    }
};

export default actions;
