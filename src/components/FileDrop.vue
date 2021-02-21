<template>
  <v-sheet
      tabindex="0"
      color="grey lighten-4"
      width="100%"
      class="pa-2 uploading"
      @drop.prevent="onFileDrop" @dragover.prevent="dragover=true" @dragleave.prevent="dragover=false"
      @dragenter.prevent="dragover=true"
  >
    <input
        id="inputFile"
        type="file"
        @change="uploadFile"
        accept=".jpg,.jpeg,.png"
        class="uploading__input"
    >
    <v-row justify="center" class="my-2 mx-0">
      <v-icon
          v-if="!dragover"
          color="primary"
          size="45"
      >mdi-cloud-upload-outline
      </v-icon>
      <v-icon
          v-if="dragover"
          color="primary"
          size="45"
      >mdi-book-plus
      </v-icon>
    </v-row>
    <v-row justify="center" class="my-2 mx-0">
      <p class="uploading__subtitle">Drop image here, or <label class="uploading__label" for="inputFile">click
        here </label>to select</p>
    </v-row>
    <v-row justify="center" class="my-2 mx-0">
      <img class="uploading__img" :src="image"/>
      <v-btn
          icon

          v-if="image"
          @click="deleteImage"
      >
        <v-icon color="red">mdi-close</v-icon>
      </v-btn>
    </v-row>


  </v-sheet>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component, VModel} from 'vue-property-decorator'

@Component
export default class FileDrop extends Vue {

  dragover:boolean = false
  @VModel({type: String}) image!: string


  uploadFile(event: any): void {
    this.submit(event.target as Blob[]);
  }

  onFileDrop(event: any): void {
    const droppedFile = event.dataTransfer.files;
    this.dragover = false;
    this.submit(droppedFile);
  }

  submit(file: Blob[]): void {
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = e => {
      this.image = e!.target!.result! as string;
    }
  }

  deleteImage(): void {
    this.image = ''
  }


}
</script>

<style scoped lang="scss">
.uploading {
  &:focus {
    outline-color: #3176d2;
  }
;

  &__input {
    display: none;
  }
;

  &__subtitle {
    text-align: center;
  }
;

  &__label {
    cursor: pointer;
    text-decoration: underline;
  }
;

  &__img {
    max-width: 100px;
    max-height: 100px;
  }

}
</style>