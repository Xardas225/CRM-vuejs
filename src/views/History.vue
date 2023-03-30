<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <Pie id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>

    <section>
      <HistoryTable :records="items"></HistoryTable>
    </section>

    <v-pagination
      :page-count="5"
      :click-handler="handlePaginate"
      :prev-text="'Назад'"
      :prev-next="'Вперёд'"
      :container-class="'pagination'"
      :page-class="'waves-effect'"
      v-model="page"
      :pages="10"
      :range-size="1"
      active-color="#DCEDFF"
      @update:modelValue="updateHandler"
    >
    </v-pagination>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import { Pie } from "vue-chartjs";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

import VPagination from "@hennge/vue3-pagination";
import paginationMixin from "@/mixins/pagination.mixin";
import HistoryTable from "@/components/HistoryTable.vue";

export default {
  name: "v-history",
  components: {
    HistoryTable,
    VPagination,
    Pie,
  },
  mixins: [paginationMixin],
  data() {
    return {
      loading: true,
      records: [],
      categories: [],
    };
  },
  computed: {
    chartData() {
      let labels = this.categories.map((c) => c.title);
      let datasets = [
        {
          label: 'Расходы по категории',
          data: this.categories.map(c=>{
            return this.records.reduce((total, r)=>{
              if(r.categoryId === c.id && r.type === 'outcome') {
                total += r.amount;
              }
              return total;
            },0)
          }),
          backgroundColor: this.categories.map(()=> ('#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)))
        },
      ];
      return { labels, datasets };
    },
    chartOptions() {
      return { responsive: true };
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.setup();

    this.loading = false;
  },
  methods: {
    handlePaginate() {},
    async setup() {
      this.records = await this.$store.dispatch("fetchRecords");
      this.setupPagination(
        this.records.map((record) => {
          return {
            ...record,
            categoryName: this.categories.find(
              (c) => c.id === record.categoryId
            ).title,
            typeClass: record.type === "income" ? "green" : "red",
            typeText: record.type === "income" ? "Доход" : "Расход",
          };
        })
      );
    },
  },
};
</script>
