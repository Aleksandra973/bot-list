<template>
  <v-dialog
      v-model="show"
      persistent
      scrollable
      max-width="800px"
  >
    <v-card>
      <v-card-title>
        <span class="headline">{{title}}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form>
            <v-text-field
                v-model="bot.name"
                :error-messages="nameErrors"
                label="Name"
                required
                @input="$v.bot.name.$touch()"
                @blur="$v.bot.name.$touch()"
            />
            <v-textarea
                v-model="bot.description"
                label="Description"
                :counter="100"
                :error-messages="descriptionErrors"
                @input="$v.bot.description.$touch()"
                @blur="$v.bot.description.$touch()"
                auto-grow
                rows="2"
                row-height="15"
            ></v-textarea>
            <FileDrop v-model="bot.image"/>
            <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="bot.date"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="bot.date"
                    :error-messages="dateErrors"
                    required
                    @input="$v.bot.date.$touch()"
                    @blur="$v.bot.date.$touch()"
                    label="Date"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="bot.date"
                  no-title
                  scrollable
                  color="primary"
              >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(bot.date)"
                >
                  OK
                </v-btn>
                <v-btn
                    text
                    class="cancel-button"
                    @click="menu = false"
                >
                  Cancel
                </v-btn>

              </v-date-picker>
            </v-menu>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        <v-btn
            color="primary"
            text
            @click="saveBot"
        >
          Save
        </v-btn>
        <v-btn
            class="cancel-button"
            text
            @click="closeDialog"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script lang="ts">
import {Component, Prop, VModel, Watch} from 'vue-property-decorator'
import {validationMixin} from 'vuelidate'
import {required, maxLength, minLength} from 'vuelidate/lib/validators'
import FileDrop from "@/components/FileDrop.vue";
import $store from "@/store";
import Vue from "vue";
import {Bot} from "@/types/common";
import moment from "moment";

interface ModelBot extends Omit<Bot, 'date'> {
  date: any
}

@Component({
  components: {FileDrop},
  mixins: [validationMixin],
  validations: {
    bot: {
      name: {required, minLength: minLength(3)},
      description: {required, maxLength: maxLength(100)},
      date: {required}
    }

  },
})
export default class ModalForm extends Vue {

  bot: ModelBot = {
    id: 0,
    name: '',
    description: '',
    date: '',
    image: ''
  }
  title: string = 'Create a new bot'
  menu: boolean = false

  @Prop() readonly botId!: number
  @VModel({type: Boolean}) show!: boolean
  @Watch('show')
  onShowChanged(val: boolean, oldVal: boolean) {
    if (val===true && oldVal===false && this.botId>0) {
        this.title = 'Edit current bot'
        const result = this.$store.getters['botsModule/currentBots'](this.botId)
        this.bot = {...result}
        this.bot.date = moment(result.date).format("YYYY-MM-DD")
    }
  }


  async saveBot() {
    this.$v.$touch()
    if (this.$v.$invalid) return
    const model = Object.assign({},this.bot);
    model.date = moment(this.bot.date).toDate()
    if (this.bot.id===0) {
      model.id = new Date().getTime()
    }

    await $store.dispatch('botsModule/saveBot', model as Bot)
    await $store.dispatch('botsModule/getBots');
    if (this.title === 'Create a new bot') {
      this.closeDialog()
    }
  }

  closeDialog() {
    this.show = false
    this.$v.$reset()
    this.bot = {} as ModelBot
    this.title = 'Create a new bot'
  }

  get nameErrors(): string[] {
    const errors: string[] = []
    if (!this.$v?.bot?.name?.$dirty) return errors
    !this.$v.bot.name.minLength && errors.push('The name must be at least 3 characters long.')
    !this.$v.bot.name.required && errors.push('Name is required.')
    return errors
  }

  get descriptionErrors(): string[] {
    const errors: string[] = []
    if (!this.$v?.bot?.description?.$dirty) return errors
    !this.$v.bot.description.maxLength && errors.push('The description must be at most 100 characters long.')
    !this.$v.bot.description.required && errors.push('Description is required.')
    return errors
  }

  get dateErrors(): string[] {
    const errors: string[] = []
   if (!this.$v?.bot?.date?.$dirty) return errors
   !this.$v.bot.date.required && errors.push('Date is required')
 return errors
  }


}
</script>

<style scoped lang="scss">
.cancel-button {
  color: #272727 !important;
}
</style>