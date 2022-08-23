<script>
import { mapGetters, mapState, mapMutations } from "vuex";

export default {
  name: "Todo",

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
        finishDate: new Date(this.todoDate).toISOString(),
        createdat: new Date().toISOString(),
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
        <v-col sm="5" class="bg-grey-lighten-4">
          <div class="text-h4 px-3 mt-5 font-weight-bold">Add a new todo</div>
          <VForm
            @submit.prevent="getInputValue"
            class="d-flex align-center justify-center row"
          >
            <v-col sm="7"
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
                type="datetime-local"
                hide-details="false"
                variant="outlined"
                v-model="todoDate"
              ></v-text-field>
            </v-col>
            <v-col sm="2"
              ><v-btn
                style="height: 55px"
                color="primary"
                class="w-100"
                @click="getInputValue"
              >
                <v-icon icon="mdi mdi-plus-thick"></v-icon> </v-btn
            ></v-col>
          </VForm>
          <v-col sm="12" class="mt-10 px-0 d-flex" v-if="totalTodos > 0">
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
              'd-flex justify-beetween align-center px-0',
              newTodo.isChecked && 'text-disabled',
            ]"
          >
            <v-checkbox
              :label="newTodo.todo"
              v-model="newTodo.isChecked"
              color="primary"
              @change="completeTodo(newTodo)"
              hide-details="false"
            ></v-checkbox>

            <div
              :class="[
                'text-caption mx-3',
                new Date(newTodo.finishDate).getTime() < new Date().getTime() &&
                !newTodo.isChecked
                  ? 'text-error'
                  : 'text-success',
              ]"
            >
              {{ newTodo?.formattedFinishdate }}
            </div>

            <v-btn
              icon
              dark
              size="x-small"
              color="error"
              class="mr-3"
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
