<template>
  <div class="col-8">
    <div> <BotItem /></div>
    <div> <BotItem /></div>

  </div>
</template>

<script>

import BotItem from "@/components/BotItem";
import Vue from "vue";
export default Vue.extend({
  name: "BotList",
  components: {
    BotItem
  }
})
</script>

<style scoped lang="scss">

</style>