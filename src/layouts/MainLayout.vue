<template>
  <div>
    <Loader v-if="loading"></Loader>
    <div v-else class="app-main-layout">
      
      <Navbar @click="isOpen = !isOpen"></Navbar>

      <Sidebar :isOpen="isOpen"></Sidebar>

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
            <router-view></router-view>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" href="#" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/app/Sidebar.vue';
import Navbar from '@/components/app/Navbar.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'main-layout',
  components: {
    Sidebar, Navbar
  },
  data() {
    return {
      isOpen: false,
      loading: true
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    await this.$store.dispatch('fetchInfo');

    this.loading = false;
  }
}
</script>