<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate @created="createNewCategory"></CategoryCreate>

        <CategoryEdit></CategoryEdit>
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
    };
  },
  methods: {
    createNewCategory(category) {
      console.log(category);
    },
  },
  components: {
    CategoryCreate,
    CategoryEdit,
  },
};
</script>
