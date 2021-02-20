import Vuex from 'vuex';
import Vue  from 'vue'
import botsModule from './botModule';
import {Bot} from "@/types/common";


Vue.use(Vuex)

export interface RootState {
  botsModule: Bot[];
}

const Store  = new Vuex.Store<RootState>({
      modules: {
        botsModule
      }
    }
)

export default Store
