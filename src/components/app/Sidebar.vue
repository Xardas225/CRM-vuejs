<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">
    <router-link
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      active-class="active"
      :exact="link.exact"
      v-slot="{ href , navigate , isExactActive }"
    >
      <li :class="[isExactActive && 'active']">
        <a
          :href="href"
          @click="navigate"
          class="waves-effect waves-orange pointer"
          >{{ link.title }}</a
        >
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "v-sidebar",
  props: ['isOpen'],
  data() {
    return {
      links: [
        { title: "Счет", url: "/", exact: true },
        { title: "История", url: "/history", exact: false },
        { title: "Планирование", url: "/planning", exact: false },
        { title: "Новая запись", url: "/record", exact: false },
        { title: "Категории", url: "/categories", exact: false },
      ],
    };
  },
};
</script>
