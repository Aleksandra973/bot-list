import {createLocalVue, mount, shallowMount} from '@vue/test-utils'
import BotItem from '@/components/BotItem.vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)
import Vue from 'vue'
import MainContent from "@/components/MainContent.vue";
import Vuex from "vuex";
import {RootState} from "@/store";
import botsModule from "@/store/botModule";
import {Bot} from "@/types/common";

describe('BotItem.vue', () => {

    it('renders props.msg when passed', () => {
        const bot = {
            id: 0,
            name: 'First',
            description: 'new',
            date: '',
            image: ''
        }
        const wrapper = shallowMount(BotItem, {
            localVue: createLocalVue(),
            vuetify: new Vuetify(),
            propsData: {
                bot: bot
            }
        })

        expect(wrapper.find(".bot-item__title").text()).toMatch(bot.name)
    })
})

describe('MainContent', () =>{

    it('Show list', ()=>{
        const localVue = createLocalVue()

        const bots = []
         for (let i=0; i<10; i++) {
             bots.push({
                 id: i,
                 name: `name-${i}`,
                 description: 'new',
                 date: new Date(),
                 image: ''
             })
         }

        const mockStore = {
            dispatch: jest.fn(),
            getters: {
                "botsModule/bots": bots
            }
        }

        const wrapper = mount(MainContent, {
            localVue,
            vuetify: new Vuetify(),
            mocks: {
                $store: mockStore
            }
        })

        let text = wrapper.find('.col-8').text();

        for(let i=0; i<10; i++){
            expect(text).toMatch(`name-${i}`)
        }

    })
})