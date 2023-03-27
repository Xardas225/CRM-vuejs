<template>
  <v-loader v-if="loading"></v-loader>

  <p v-else-if="!categories.length">
    <router-link to="/categories"></router-link>
  </p>

  <div v-else>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select">
          <option>name cat</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input id="amount" type="number" />
        <label for="amount">Сумма</label>
        <span class="helper-text invalid">amount пароль</span>
      </div>

      <div class="input-field">
        <input id="description" type="text" />
        <label for="description">Описание</label>
        <span class="helper-text invalid">description пароль</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';

export default {
    name: 'v-record',
    data() {
      return {
        categories: [],
        loading: true,
        select: null
      }
    },
    setup() {
      return{v$: useVuelidate()}
    },
    validations: () => ({

    }),
    methods: {
      submitHandler() {
        if(this.v$.$invalid) {
          this.v$.$touch();
          return;
        }
      }
    },
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.select = window.M.FormSelect.init(this.$refs.select);
      this.loading = false;
    }
}
</script>
