<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model="email"
          :class="{
            invalid:
              (v$.email.$dirty && !v$.email.required) ||
              (v$.email.$dirty && v$.email.email),
          }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="v$.email.$dirty && !v$.email.required"
        >
          Введите Email
        </small>
        <small
          class="helper-text invalid"
          v-else-if="v$.email.$dirty && v$.email.email"
        >
          Email некорректный
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model="password"
          :class="{
            invalid:
              (v$.password.$dirty && !v$.password.required) ||
              (v$.password.$dirty && v$.password.minLength),
          }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="v$.password.$dirty && !v$.password.required"
        >
          Введите пароль
        </small>
        <small
          class="helper-text invalid"
          v-else-if="v$.password.$dirty && v$.password.minLength"
        >
          Пароль должен быть не меньше
          {{ v$.password.minLength.$params.min }} символов
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

export default {
  name: "v-login",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations: () => ({
    email: { required, email },
    password: { required, minLength: minLength(6) },
  }),
  methods: {
    submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      this.$router.push("/");
    },
  },
  onMounted() {
    this.v$.$reset();
  },
};
</script>
