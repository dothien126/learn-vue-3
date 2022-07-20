<template>
  <div class="login">
    <form @submit="handleLogin" class="loginForm">
      <h1>LOGIN FOR USER</h1>
      <input class="input" type="text" v-model="email" placeholder="Email" />
      <input
        class="input"
        type="text"
        v-model="password"
        placeholder="Password"
      />
      <button class="button" type="submit">Login</button>
      <p>
        Do not have account yet ?
        <router-link :to="{ path: '/register' }">
          <button class="button">Register</button>
        </router-link>
      </p>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "Login",
  components: {},
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handleLogin = async (event) => {
      event.preventDefault();

      try {
        const loginForm = {
          email: email.value,
          password: password.value,
        };
        const res = await axios.post(
          "http://localhost:3003/api/session/login",
          loginForm
        );
        console.log("login", res.data);
      } catch (error) {
        console.log(error);
      }

      email.value = "";
      password.value = "";

      router.push("/");
    };

    return {
      router,
      email,
      password,
      handleLogin,
    };
  },
};
</script>

<style>
.login {
  margin-top: 200px;
}

.loginForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.input {
  margin: 10px 0;
  height: 30px;
  width: 300px;
}

.button {
  height: 30px;
  width: 90px;
}
</style>
