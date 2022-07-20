<template>
  <div class="register">
    <h1 class="registerTitle">REGISTER FOR USER</h1>
    <form @submit="handleRegister" class="registerForm">
      <input class="input" type="text" v-model="name" placeholder="Your name" />
      <input
        class="input"
        type="text"
        v-model="email"
        placeholder="Your email"
      />
      <input
        class="input"
        type="password"
        v-model="password"
        placeholder="Your password"
      />
      <input
        class="input"
        type="password"
        v-model="passwordConfirmation"
        placeholder="Your password confirm"
      />
      <button class="button" type="submit">Register</button>
      <p>
        Already have an account ?
        <router-link :to="{ path: '/login' }"
          ><button class="button">Login</button>
        </router-link>
      </p>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  name: "Register",
  setup() {
    const router = useRouter();
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const passwordConfirmation = ref("");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handleRegister = async (event) => {
      event.preventDefault();

      try {
        const registerForm = {
          name: name.value,
          email: email.value,
          password: password.value,
          passwordConfirmation: passwordConfirmation.value,
        };
        const res = await axios.post(
          "http://localhost:3003/api/users/register",
          registerForm
        );
        console.log("reg", res.data);
      } catch (error) {
        console.log(error);
      }

      name.value = "";
      email.value = "";
      password.value = "";
      passwordConfirmation.value = "";
      router.push("/login");
    };

    return {
      email,
      password,
      name,
      passwordConfirmation,
      handleRegister,
    };
  },
};
</script>

<style>
.register {
  margin-top: 200px;
}

.registerTitle {
  text-align: center;
}

.registerForm {
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
