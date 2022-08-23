<template>
  <Todo />
</template>

<script>
import { defineComponent } from "vue";

// Components
import Todo from "../components/todo.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    Todo,
  },
});
</script>
