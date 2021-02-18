<template>
  <v-container class="d-flex flex-column align-center">
    <div class="mb-4">
      <v-btn
          color="primary"
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
  <BotList />
    <ModalForm></ModalForm>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import BotList from "@/components/BotList.vue";
  import ModalForm from "@/components/ModalForm.vue";

  export default Vue.extend({
    name: 'HelloWorld',
    components: {ModalForm, BotList},
    data: () => ({

    }),
  })
</script>
