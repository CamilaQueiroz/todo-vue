import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createStore } from "vuex";
import { todo } from "./store/modules/todo";

// Create a new store instance.
const store = createStore({
  modules: {
    todo,
  },
});

loadFonts();

createApp(App).use(router).use(vuetify).use(store).mount("#app");
