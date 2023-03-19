<template>
  <div>
    <div class="app-main-layout">
      
      <Navbar @click="isOpen = !isOpen"></Navbar>

      <Sidebar :isOpen="isOpen"></Sidebar>

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
            <router-view></router-view>
        </div>
      </main>

      <div class="fixed-action-btn">
        <a class="btn-floating btn-large blue" href="#">
          <i class="large material-icons">add</i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/app/Sidebar.vue';
import Navbar from '@/components/app/Navbar.vue';

export default {
  name: 'main-layout',
  components: {
    Sidebar, Navbar
  },
  data() {
    return {
      isOpen: false
    }
  }
}
</script>