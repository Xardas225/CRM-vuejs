<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @click.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: v$.title.$dirty && !v$.title.required }"
          />
          <label for="name">Название</label>
          <span
            class="helper-text invalid"
            v-if="v$.title.$dirty && !v$.title.required"
          >
            Введите название
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model="limit"
            :class="{ invalid: v$.limit.$dirty && !v$.limit.minValue }"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="v$.limit.$dirty && !v$.limit.minValue"
          >
            Минимальная величина
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";

export default {
  name: "v-category-create",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      title: "",
      limit: 1,
    };
  },
  validations: () => ({
    title: { required },
    limit: { required, minValue: minValue(1) },
  }),
  methods: {
    submitHandler() {
        if(this.v$.$invalid) {
            this.v$.$touch();
            return;
        }
    }
  }
};
</script>
