import { api } from "../../services/api";

const state = () => ({
  todoList: [],
  updatingTodo: false,
});

const mutations = {
  setTodoList(state, payload) {
    state.todoList = payload;
    state.updatingTodo = false;
  },
  addTodo(state, payload) {
    state.todoList = [...state.todoList, payload];
    state.updatingTodo = false;
  },
  removeTodo(state, payload) {
    state.todoList = state.todoList.filter((todo) => todo.id !== payload);
    state.updatingTodo = false;
  },
  updateTodo(state, payload) {
    state.todoList = state.todoList.map((todo) =>
      todo.id === payload.id ? payload : todo
    );
    state.updatingTodo = false;
  },
  todoFailure(state, payload) {
    state.updatingTodo = false;
    console.log("Erro =====> ", payload);
  },
};

const actions = {
  async getTodoList({ commit, state }) {
    state.updatingTodo = true;
    await api
      .get("todos")
      .then((res) => {
        const todos = res.data
          .map((todo) => {
            return {
              ...todo,
              formattedFinishdate: new Intl.DateTimeFormat("pt-br", {
                dateStyle: "medium",
              }).format(new Date(todo.finishDate)),
            };
          })
          .sort((a, b) => new Date(a.finishDate) - new Date(b.finishDate))
          .sort((a, b) => Number(a.isChecked) - Number(b.isChecked));
        commit("setTodoList", todos);
      })
      .catch((err) => {
        commit("todoFailure", err);
      });
  },
  async addTodo({ commit, state }, payload) {
    state.updatingTodo = true;
    await api
      .post("todos", payload)
      .then(({ data }) => {
        const todo = {
          ...data,
          formattedFinishdate: new Intl.DateTimeFormat("pt-br", {
            dateStyle: "medium",
          }).format(new Date(data.finishDate)),
        };
        commit("addTodo", todo);
      })
      .catch((err) => {
        commit("todoFailure", err);
      });
  },
  async removeTodo({ commit, state }, payload) {
    state.updatingTodo = true;
    await api
      .delete(`todos/${payload}`)
      .then((res) => {
        commit("removeTodo", payload);
      })
      .catch((err) => {
        commit("todoFailure", err);
      });
  },
  async updateTodo({ commit, state }, payload) {
    state.updatingTodo = true;
    await api
      .put(`todos/${payload.id}`, payload)
      .then(({ data }) => {
        const todo = {
          ...data,
          formattedFinishdate: new Intl.DateTimeFormat("pt-br", {
            dateStyle: "medium",
          }).format(new Date(data.finishDate)),
        };
        commit("updateTodo", todo);
      })
      .catch((err) => {
        commit("todoFailure", err);
      });
  },
};

const getters = {
  totalTodos(state) {
    return state.todoList.length;
  },
  doneTodos(state) {
    return state.todoList.filter((todo) => todo.isChecked);
  },
};

export const todo = {
  state,
  mutations,
  actions,
  getters,
};
