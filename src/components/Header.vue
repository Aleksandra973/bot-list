<template>
<div class="d-flex justify-center">
  <img src="../../public/big-bot.png" class="mx-2" >
  <h1 class="d-flex align-self-center mx-2 title text-md-h3 text-sm-h4">Telegram bots</h1>
</div>
</template>

<script>
import Vue from "vue";
import { Component } from 'vue-property-decorator'

@Component
export default class Header  extends Vue{

}
</script>

<style scoped lang="scss">
  .title{
    text-transform: uppercase;
    color: #2e69ff;
  }
</style>
