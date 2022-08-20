<script>
import { mapGetters } from "vuex";

export default {
  name: "HelloWorld",

  data: () => ({
    todo: "",
  }),
  methods: {
    getInputValue() {
      const todo = {
        id: (Math.random() * 1500000).toFixed(),
        todo: this.todo,
        isChecked: false,
      };
      this.$store.commit("addTodo", todo);
      console.log(this.$store.state.todo.todoList);
      this.todo = "";
    },
    removeTodo(id) {
      this.$store.dispatch("removeTodo", id);
    },
  },
  computed: {
    ...mapGetters(["totalTodos", "totalDoneTodos", "totalUnrealizedTodos"]),
  },
};
</script>

<template>
  <v-form>
    <v-container>
      <v-row class="justify-center mt-10">
        <v-col sm="5">
          <VForm @submit.prevent="getInputValue">
            <v-text-field
              label="O que precisa fazer?"
              outlined
              v-model="todo"
            ></v-text-field>
          </VForm>
          <v-col sm="12" class="d-flex justify-center align-items-center">
            <v-chip class="ma-2" color="primary">
              {{ totalTodos }} Todos
            </v-chip>
            <v-chip class="ma-2" color="success">
              {{ totalDoneTodos }} Concluídos
            </v-chip>
            <v-chip class="ma-2" color="error">
              {{ totalUnrealizedTodos }} Não concluídos
            </v-chip>
          </v-col>
          <v-col
            sm="12"
            v-for="(newTodo, index) in $store.state.todo.todoList"
            class="d-flex justify-beetween align-items-center"
          >
            <v-checkbox
              :label="newTodo.todo"
              v-model="newTodo.isChecked"
            ></v-checkbox>

            <v-btn
              fab
              dark
              small
              color="primary"
              @click="removeTodo(newTodo.id)"
            >
              <v-icon dark> mdi-delete </v-icon>
            </v-btn>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
