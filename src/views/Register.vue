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
      <div class="checkbox-field">
        <label>
          <input
            type="checkbox"
            :class="{ invalid: v$.agree.$dirty && v$.agree.checked }"
          />
          <span>С правилами согласен</span>
        </label>
        <small
          class="helper-text invalid"
          v-if="v$.agree.$dirty && v$.agree.checked"
        >
          Нажми чекбокс
        </small>
      </div>
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
import { required, minLength, email} from "@vuelidate/validators";

export default {
  name: "v-register",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      password: "",
      name: "",
      agree: true,
    };
  },
  validations: () => ({
      email: { required, email },
      password: { required, minLength: minLength(6) },
      name: { required, minLength: minLength(2) },
      agree: { checked: v => v }
  }),
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      let formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('register', formData);
        this.$router.push("/");
      } catch(e) {
        console.log(e);
      }

    },
  },
};
</script>


<style>
.checkbox-field {
  display: flex;
  flex-direction: column;
}
</style>
