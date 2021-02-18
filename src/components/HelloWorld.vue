<template>
  <v-container>
    <div class="d-flex justify-center">
      <v-btn
          color="purple"
          x-large
          dark
      >
        <v-icon
            left
        >
          mdi-plus
        </v-icon>Add new bot
      </v-btn>
    </div>

  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'HelloWorld',

    data: () => ({

    }),
  })
</script>
