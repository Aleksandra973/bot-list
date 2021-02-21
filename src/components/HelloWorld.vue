<template>
  <v-container class="d-flex flex-column align-center">
    <div class="mb-4">
      <v-btn
          color="primary"
          x-large
          dark
          @click="openModal"
      >
        <v-icon
            left
        >
          mdi-plus
        </v-icon>
        Add new bot
      </v-btn>
    </div>
    <div class="col-8">
      <BotItem
          v-for="bot in bots" :key="bot.id"
          :bot="bot"

      />
    </div>

    <ModalForm v-model="modalIsVisible"/>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import ModalForm from "@/components/ModalForm.vue";
import BotItem from "@/components/BotItem.vue";
import $store from "../store"

@Component({
  components: {ModalForm, BotItem}
})
export default class HelloWorld extends Vue {
  modalIsVisible: boolean = false

  async openModal() {
    this.modalIsVisible = true
  }

  get bots() {
    return $store.getters['botsModule/bots']
  }

  async mounted() {
    await $store.dispatch('botsModule/getBots');
  }
}
</script>
