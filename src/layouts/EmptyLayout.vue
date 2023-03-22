<template>
  <div class="grey darken-1 empty-layout">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import messages from "@/utils/messages";

export default {
  name: "empty-layout",
  computed: {
    ...mapGetters(["getError"]),
    error() {
      return this.getError;
    },
  },
  watch: {
    error(error) {
      if (messages[error.code]) {
        this.$error(messages[error.code]);
      }
    },
  },
};
</script>
