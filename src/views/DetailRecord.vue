<template>
  <div>
    <v-loader v-if="loading"></v-loader>
    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link class="breadcrumb" to="/history">История</router-link>
        <a @click.prevent class="breadcrumb"> {{ record.typeText }} </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="[record.typeClass]">
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ record.amount }}</p>
              <p>Категория: {{ record.categoryName }}</p>

              <small>{{ record.date }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-detailt-record",
  data() {
    return {
      record: {}
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch('fetchRecordById', id);
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId);

    this.record = {
      ...record, 
      categoryName: category.title,
      typeText: record.type === 'income' ? 'Доход' : 'Расход',
      typeClass: record.type === 'income' ? 'green' : 'red'
    }

    this.loading = false;
  },
};
</script>
