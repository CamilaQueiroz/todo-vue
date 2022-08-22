<script>
import { mapGetters, mapState, mapMutations } from "vuex";

export default {
  name: "HelloWorld",

  data: () => ({
    todo: "",
    todoDate: "",
  }),
  methods: {
    getInputValue() {
      if (this.todo === "") return;
      const todo = {
        todo: this.todo,
        isChecked: false,
        date: new Date(this.todoDate).toISOString(),
      };
      this.$store.dispatch("addTodo", todo);
      this.todo = "";
      this.todoDate = "";
    },
    removeTodo(id) {
      this.$store.dispatch("removeTodo", id);
    },
    completeTodo(todo) {
      this.$store.dispatch("updateTodo", todo);
    },
  },
  computed: {
    ...mapGetters(["totalTodos", "doneTodos"]),
    ...mapState({
      todoList: (state) => state.todo.todoList,
      loading: (state) => state.todo.updatingTodo,
    }),
  },
  mounted() {
    this.$store.dispatch("getTodoList");
  },
};
</script>

<template>
  <v-form>
    <v-container>
      <v-row class="justify-center mt-10">
        <v-col sm="5">
          <div class="text-h5 mb-3 font-weight-bold">Add a new todo</div>
          <VForm
            @submit.prevent="getInputValue"
            class="d-flex align-center justify-center row"
          >
            <v-col sm="8"
              ><v-text-field
                label="What do you need to do?"
                variant="outlined"
                hide-details="false"
                v-model="todo"
              ></v-text-field
            ></v-col>

            <v-col sm="3">
              <v-text-field
                label="set the date"
                type="date"
                hide-details="false"
                disablePast="true"
                v-model="todoDate"
              ></v-text-field>
            </v-col>
            <v-col sm="1"
              ><v-btn
                style="height: 55px"
                color="success"
                @click="getInputValue"
              >
                <v-icon icon="mdi mdi-plus-thick"></v-icon> </v-btn
            ></v-col>
          </VForm>
          <v-col
            sm="12"
            class="mt-10 px-0 d-flex justify-center"
            v-if="totalTodos > 0"
          >
            <v-chip class="ma-2" color="primary">
              <template v-if="totalTodos > 1">
                {{ totalTodos }} Todos
              </template>
              <template v-else> {{ totalTodos }} Todo </template>
            </v-chip>
          </v-col>
          <v-col
            sm="12"
            v-for="(newTodo, index) in todoList"
            :class="[
              'd-flex justify-beetween align-items-center px-0',
              newTodo.isChecked && 'text-disabled',
            ]"
          >
            <v-checkbox
              :label="newTodo.todo"
              v-model="newTodo.isChecked"
              @change="completeTodo(newTodo)"
              hide-details="false"
            ></v-checkbox>

            <v-btn
              icon
              dark
              size="x-small"
              color="error"
              @click="removeTodo(newTodo.id)"
            >
              <v-icon dark> mdi-delete </v-icon>
            </v-btn>
          </v-col>
          <v-col xs="12" class="d-flex justify-center" v-if="loading"
            ><v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular
          ></v-col>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
