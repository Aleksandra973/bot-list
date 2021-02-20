import { MutationTree } from 'vuex';
import {BotsState} from './state';
import {Bot} from "@/types/common";

const mutation: MutationTree<BotsState> = {
    SET_BOTS: (state, bots: Bot[])=> {
        state.bots = bots
    }
}

export default mutation;
