import { createRouter, createWebHistory } from "vue-router";

import UserLogin from "../components/Login.vue";
import Register from "../components/Register.vue";
import Home from "../components/Home.vue";
import Todo from "../components/Todo.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Register",
    component: UserLogin,
  },
  {
    path: "/register",
    name: "Login",
    component: Register,
  },
  {
    path: "/todolist",
    name: "Todolist",
    component: Todo,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
