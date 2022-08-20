const state = () => ({
  todoList: [],
});

const mutations = {
  addTodo(state, payload) {
    state.todoList = [...state.todoList, payload];
  },
  removeTodo(state, payload) {
    state.todoList = state.todoList.filter((todo) => todo.id !== payload);
  },
};

const actions = {
  removeTodo({ commit }, payload) {
    setTimeout(() => {
      commit("removeTodo", payload);
    }, 900);
  },
};

const getters = {
  totalTodos(state) {
    return state.todoList.length;
  },
  totalDoneTodos(state) {
    return state.todoList.filter((todo) => todo.isChecked).length;
  },
  totalUnrealizedTodos(state) {
    return state.todoList.filter((todo) => !todo.isChecked).length;
  },
};

export const todo = {
  state,
  mutations,
  actions,
  getters,
};
