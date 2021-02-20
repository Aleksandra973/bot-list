<template>
  <v-app>
    <Header />
    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import Header from "@/components/Header.vue";
import {BotService} from "./services/idb"

export default Vue.extend({
  name: 'App',

  components: {
    Header,
    HelloWorld,
  },

  data: () => ({
    //
  }),

   beforeCreate: async function() {
      await BotService.createObjectStore()
  }
});
</script>
