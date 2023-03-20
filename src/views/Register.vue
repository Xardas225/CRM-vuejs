<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model="email_register"
          :class="{
            invalid:
              (v$.email_register.$dirty && !v$.email_register.required) ||
              (v$.email_register.$dirty && v$.email_register.email),
          }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="v$.email_register.$dirty && !v$.email_register.required"
        >
          Введите Email
        </small>
        <small
          class="helper-text invalid"
          v-else-if="v$.email_register.$dirty && v$.email_register.email"
        >
          Email некорректный
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model="password_register"
          :class="{
            invalid:
              (v$.password_register.$dirty && !v$.password_register.required) ||
              (v$.password_register.$dirty && v$.password_register.minLength),
          }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="v$.password_register.$dirty && !v$.password_register.required"
        >
          Введите пароль
        </small>
        <small
          class="helper-text invalid"
          v-else-if="v$.password_register.$dirty && v$.password_register.minLength"
        >
          Пароль должен быть не меньше
          {{ v$.password_register.minLength.$params.min }} символов
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model="name"
          :class="{
            invalid:
              (v$.name.$dirty && !v$.name.required) ||
              (v$.name.$dirty && v$.name.minLength),
          }"
        />
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-if="v$.name.$dirty && !v$.name.required"
        >
          Введите bмя
        </small>
        <small
          class="helper-text invalid"
          v-else-if="v$.name.$dirty && v$.name.minLength"
        >
          Имя должно быть не меньше
          {{ v$.name.minLength.$params.min }} символов
        </small>
      </div>
      <p>
        <label>
          <input
            type="checkbox"
            :class="{ invalid: v$.checkbox.$dirty && !v$.checkbox.sameAs }"
          />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, email, sameAs } from "@vuelidate/validators";

export default {
  name: "v-register",
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      email: "",
      password: "",
      name: "",
      checkbox: false,
    };
  },
  validations: () => ({
      email_register: { required, email },
      password_register: { required, minLength: minLength(6) },
      name: { required, minLength: minLength(2) },
      checkbox: { sameAs: sameAs(() => true) },
  }),
  methods: {
    submitHandler() {
      if (this.v$.$error) {
        this.v$.touch();
        return;
      }
      this.$router.push("/");
    },
  },
};
</script>
