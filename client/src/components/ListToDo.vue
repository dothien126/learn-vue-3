<template>
  <div class="container">
    <form>
      <h1>ListToDo</h1>
      <input type="text" v-model="title" required placeholder="Add todo" />
      <button @click="handlAddToDo" v-if="!isUpdate" class="btn-addtodo">
        Add
      </button>
      <button @click="actionUpdateTodo" v-else class="btn-update">
        Update
      </button>
    </form>

    <table class="table table-bordered mt-5">
      <thead>
        <tr>
          <th scope="col" class="text-center" style="font-size: 20px">Title</th>
          <th scope="col" class="text-center" style="font-size: 20px">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in todos" :key="item._id">
          <td style="font-size: 18px">{{ item.title }}</td>
          <td class="text-center">
            <button @click="handlUpdate(item)" class="btn-update">
              Update
            </button>

            <button @click="handlDelete(item._id)" class="btn-delete">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "axios";
export default {
  name: "ListToDo",
  setup() {
    const title = ref("");
    const todos = ref([]);
    const isUpdate = ref(false);
    const todoUpdate = ref();
    // getAll todo
    const getAllToDo = async () => {
      try {
        const accessToken = await localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8000/td1/list`, {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        });
        todos.value = res.data;
        console.log("res", res.data);
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(() => {
      getAllToDo();
    });

    // creat todo
    const handlAddToDo = async (event) => {
      event.preventDefault();
      try {
        const accessToken = await localStorage.getItem("token");
        const addToDo = {
          title: title.value,
        };

        const res = await axios.post(
          "http://localhost:8000/td1/list/todo",
          addToDo,
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("res", res.data);
        getAllToDo();
        title.value = "";
      } catch (err) {
        console.log(err);
      }
    };

    // delete todo
    const handlDelete = (id) => {
      try {
        const todo = axios.delete(`http://localhost:8000/td1/list/${id}`);
        console.log("todo", todo);
        getAllToDo();
      } catch (error) {
        console.log(error);
      }
    };

    // Update todo
    const handlUpdate = async (data) => {
      if (data) {
        todoUpdate.value = data;
        console.log(data);
        title.value = data.title;
        isUpdate.value = true;
      }
    };
    const actionUpdateTodo = async () => {
      try {
        const res = await axios.put(
          `http://localhost:8000/td1/list/${todoUpdate.value._id}`,
          { title: title.value }
        );
        console.log("res", res.data);
      } catch (error) {
        console.log(error);
      }
      title.value = "";
    };

    return {
      title,
      todos,
      handlAddToDo,
      handlDelete,
      handlUpdate,
      isUpdate,
      actionUpdateTodo,
    };
  },
};
</script>

<style>
h1 {
  padding: 10px 0 0;
  text-align: center;
  color: blue;
}
.container {
  width: 600px;
  height: auto;
  margin: 100px auto;
  border: 2px solid #bdbdbd;
  border-radius: 5px;
}
.btn-addtodo {
  width: 9%;
  height: 30px;
  margin: 0 4px;
  border: 2px solid blue;
  border-radius: 5px;
  background: blue;
  color: white;
}
.btn-update {
  border: 2px solid blue;
  border-radius: 5px;
  background: blue;
  color: white;
}
.btn-delete {
  border: 2px solid red;
  border-radius: 5px;
  background: red;
  color: white;
}
</style>
