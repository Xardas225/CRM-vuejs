<template>
  <v-loader v-if="loading"></v-loader>

  <p v-else-if="!categories.length" class="center ">
    Пока что категорий нет, но вы можете <router-link to="/categories">Добавить новую категорию</router-link>
  </p>

  <div v-else>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: v$.amount.$dirty && !v$.amount.required }"
        />
        <label for="amount">Сумма</label>
        <span
          v-if="v$.amount.$dirty && !v$.amount.required"
          class="helper-text invalid"
        >
          Введите сумму
        </span>
        <span
          v-if="v$.amount.$dirty && !v$.amount.minValue"
          class="helper-text invalid"
        >
          Указано значение меньше минимальной суммы
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{
            invalid: v$.description.$dirty && !v$.description.required,
          }"
        />
        <label for="description">Описание</label>
        <span
          v-if="v$.description.$dirty && !v$.description.required"
          class="helper-text invalid"
        >
          Введите описание
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
  name: "v-record",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      categories: [],
      loading: true,
      select: null,
      amount: 1,
      description: "",
      type: "income",
      category: null
    };
  },
  validations: () => ({
    amount: { required, minValue: minValue(1) },
    description: { required },
    type: { required },
  }),
  computed: {
    ...mapGetters(["info"]),
    canCreateRecord() {
      if (this.type === "outcome") {
        return this.info.bill >= this.amount;
      }
      return true;
    },
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      try {
        if (this.canCreateRecord) {
          await this.$store.dispatch("createRecord", {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON(),
          });
        }
        const bill =
          this.type === "income"
            ? this.info.bill + this.amount
            : this.info.bill - this.amount;

        this.$store.dispatch("updateInfo", { bill });
        this.$message('Запись успешно создана');
        this.v$.$reset();
        this.amount = 1;
        this.description = '';
      } catch (error) {
        this.$error("На счете недостаточно средств");
      }
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
    setTimeout(() => {
      this.select = window.M.FormSelect.init(this.$refs.select);
      window.M.updateTextFields();
    }, 0);

    if(this.categories.length) {
      this.category = this.categories[0].id;
    }
  },
  created() {
    
  }
};
</script>
