<script>
import logo from "../assets/logo.svg";

export default {
  name: "HelloWorld",

  data: () => ({
    logo,
    todo: "",
    todoList: [],
    todos: {},
  }),
  methods: {
    getInputValue() {
      const formattedTodo = {
        id: (Math.random() * 1500000).toFixed(),
        todo: this.todo,
        isChecked: false,
      };
      this.todoList = [...this.todoList, formattedTodo];
      this.todo = "";
    },
    removeTodo(id) {
      this.todoList = this.todoList.filter((todo) => todo.id !== id);
    },
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
          <v-col
            sm="12"
            v-for="(newTodo, index) in todoList"
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
