<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>


    <section>
      <HistoryTable :records="records"></HistoryTable>
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue';

export default {
    name: 'v-history',
    components: {
      HistoryTable
    },
    data() {
      return {
        loading    : true,
        categories : [],
        records    : []
      }
    },
    async mounted() {
      const records = await this.$store.dispatch('fetchRecords');
      this.categories = await this.$store.dispatch('fetchCategories');
      this.records = records.map(record => {
        return {
          ...record,
          categoryName: this.categories.find(c=>c.id===record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход' 
        }
      })
      this.loading = false;
    }
}
</script>
