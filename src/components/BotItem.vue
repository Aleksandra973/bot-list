<template>
  <div class="bot-item mb-4 pa-2">
    <span class="bot-item__title">New bot</span>
    <v-btn
        color="red"
        fab
        x-small
        dark
    >
      <v-icon>mdi-trash-can-outline</v-icon>
    </v-btn>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
name: "BotItem"
})
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
    }
  }
</style>