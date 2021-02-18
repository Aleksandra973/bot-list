<template>
  <v-form>
    <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        label="Name"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
    />
    <v-textarea
        v-model="description"
        label="Description"
        :counter="100"
        :error-messages="descriptionErrors"
        @input="$v.description.$touch()"
        @blur="$v.description.$touch()"
        auto-grow
        rows="2"
        row-height="15"
    ></v-textarea>
    <FileDrop />
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
            v-model="date"
            :error-messages="dateErrors"
            required
            @input="$v.date.$touch()"
            @blur="$v.date.$touch()"
            label="Date"
            append-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
          v-model="date"
          no-title
          scrollable
      >
        <v-spacer></v-spacer>
        <v-btn
            text
            color="primary"
            @click="menu = false"
        >
          Cancel
        </v-btn>
        <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-menu>
  </v-form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength} from 'vuelidate/lib/validators'
import FileDrop from "@/components/FileDrop";
export default {
  name: "ModalForm",
  components: {FileDrop},
  mixins: [validationMixin],

  validations: {
    name: {required, minLength: minLength(3)},
    description: {required, maxLength: maxLength(100)},
    date: {required}
  },

  data: ()=>({
    name: '',
    description: '',
    date: '',
    menu: false,
  }),

  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.minLength && errors.push('The name must be at least 3 characters long.')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.maxLength && errors.push('The description must be at most 100 characters long.')
      !this.$v.description.required && errors.push('Description is required.')
      return errors
    },
    dateErrors() {
        const errors = []
        if (!this.$v.date.$dirty) return errors
        !this.$v.date.required && errors.push('Date is required')
        return errors
    }
  }

}
</script>

<style scoped>

</style>