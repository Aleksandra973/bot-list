<template>
  <v-sheet
      tabindex="0"
      color="grey lighten-4"
      width="100%"
      class="pa-2 uploading"
      @drop.prevent="onFileDrop" @dragover.prevent
  >
    <input
        id="inputFile"
        type="file"
        @change="uploadFile"
        accept=".jpg,.jpeg,.png"
        class="uploading__input"
    >
    <p>Drop image here, or <label class="uploading__label" for="inputFile">click here </label>to select</p>
    <img class="uploading__img" :src="image" />
    <v-btn
        color="red"
        fab
        x-small
        dark
        v-if="image"
        @click="deleteImage"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-sheet>
</template>

<script lang="ts">
import Vue from "vue";


export default Vue.extend({
  name: "FileDrop",
  data: ()=>({
    image: ''
  }),
  methods: {
    uploadFile(event) {
      const {files} = event.target;
      this.submit(files);
    },
    onFileDrop(event) {
      const droppedFile = event.dataTransfer.files;
      this.submit(droppedFile);
    },
    submit(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = e => {
          this.image = e!.target!.result! as string;
      }
    },
    deleteImage() {
      this.image = ''
    }
  }

})
</script>

<style scoped lang="scss">
  .uploading {
    &:focus {
      outline-color: #3176d2;
    };
    &__input {
      display: none;
    }
    &__label {
      cursor: pointer;
      text-decoration: underline;
    }
    &__img{
      max-width: 100px;
      max-height: 100px;
    }

  }
</style>