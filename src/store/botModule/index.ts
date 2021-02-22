import { Module } from 'vuex';
import  { RootState }  from '../index';
import state, {BotsState } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const botsModule: Module<BotsState , RootState> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
};

export default botsModule;