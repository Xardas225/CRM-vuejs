<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.title }}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="title"
            type="text"
            v-model="title"
            :class="{ invalid: v$.title.$dirty && !v$.title.required }"
          />
          <label for="title">Название</label>
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
            v-model.number="limit"
            :class="{ invalid: v$.limit.$dirty && !v$.limit.minValue }"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="v$.limit.$dirty && !v$.limit.minValue"
          >
            Минимальная величина {{ v$.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
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
  name: "v-category-edit",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      select: null,
      title: "",
      limit: 1,
      current: null
    }
  },
  methods: {
    async submitHandler() {
      if(this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      try {
        const formData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', formData);
        this.$message('Категория обновлена');
        this.$emit('updated', formData);
      } catch (error) {
        console.log(error);
      }
    }
  },
  validations: () => ({
    title: { required },
    limit: { required, minValue: minValue(1) },
  }),
  props: {
    categories: {
      type: Array,
      default() {
        return []
      },
      required: true
    }
  },
  watch: {
    current(id) {
      const {title, limit} = this.categories.find(cat => cat.id === id);
      this.title = title;
      this.limit = limit;
    } 
  },
  // Hooks
  created() {
    if(this.categories.length === 0) return;
    const {id, title, limit} = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    window.M.updateTextFields();
    this.select = window.M.FormSelect.init(this.$refs.select);
  },
  unmounted() {
    this.select = null;
  }
};
</script>
