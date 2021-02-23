<template>
  <div class="bot-item mb-4 pa-2">
    <span class="bot-item__title" @click="openEditModal">{{bot.name}}</span>
    <v-btn
        color="red"
        fab
        x-small
        dark
        @click="deleteBot"
    >
      <v-icon>mdi-trash-can-outline</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata'
import Vue from "vue";
import {Bot} from "@/types/common";
import {Component, Emit, Prop} from 'vue-property-decorator'
import $store from "@/store";



@Component
export default class BotItem extends Vue{

  @Prop() readonly bot!: Bot

  @Emit()
  openEditModal() {
    return this.bot.id
  }

  async deleteBot() {
    await $store.dispatch('botsModule/deleteBot', this.bot.id);
    await $store.dispatch('botsModule/getBots');
  }

}
</script>

<style scoped lang="scss">
  .bot-item{
    border: 2px solid rgb(0 0 0 / 9%);
    border-radius: 5px;
    min-height: 35px;
    display: flex;
    justify-content: space-between;
    &__title{
      position: relative;
      margin: 0 auto;
      cursor: pointer;
      &:hover{
        text-decoration: underline;
      }
    }
  }
</style>