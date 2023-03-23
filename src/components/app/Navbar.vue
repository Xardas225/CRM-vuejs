<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.stop="$emit('toggleSidebar')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text" ref="date">{{ date }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <router-link
                @click.prevent="logout"
                class="black-text"
                to="/logout"
              >
                <i class="material-icons">assignment_return</i>Выйти
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { getCurrentInstance } from "vue";

export default {
  name: "v-navbar",
  data() {
    return {
      date: new Date()
    };
  },
  computed: {
    name() {
      return this.$store.getters.info.name;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push("/login?message=logout");
    },
  },
  mounted() {
    this.dropdown = window.M.Dropdown.init(this.$refs.dropdown, {});
    const internalInstance = getCurrentInstance();
    this.timer = setInterval(() => {
      this.date = internalInstance.appContext.config.globalProperties
        .$moment(this.$refs.date.innerHtml)
        .format("HH:MM DD.MM.YYYY");
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
};
</script>
