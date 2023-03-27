<template>
  <v-loader v-if="loading"></v-loader>
  <div v-else>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate @created="createNewCategory"></CategoryCreate>

        <CategoryEdit 
          v-if="categories.length"
          :categories="categories" 
          :key="categories.length + updateCount"
          @updated="updateCategory"
        ></CategoryEdit>
        <p v-else>Категорий пока нет</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate.vue";
import CategoryEdit from "@/components/CategoryEdit.vue";

export default {
  name: "v-categories",
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
  methods: {
    createNewCategory(category) {
      this.categories.push(category);
    },
    updateCategory(category) {
      const idx = this.categories.findIndex(cat => cat.id === category.id);
      this.categories[idx].title = category.title; 
      this.categories[idx].limit = category.limit;
      this.updateCount++; 
    }
  },
  components: {
    CategoryCreate,
    CategoryEdit,
  },
};
</script>
