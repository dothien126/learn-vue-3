<template>
  <div class="container">
    <form>
      <h1 style="padding-top: 10px">ListToDo</h1>
      <input type="text" v-model="title" placeholder="Title todo" />
      <input type="text" v-model="content" placeholder="content todo" />
      <button @click="handlAddToDo" v-if="!isUpdate" class="btn-addtodo">
        Add
      </button>
    </form>

    <table class="table table-bordered mt-5">
      <thead>
        <tr>
          <th scope="col" class="text-center">Title</th>
          <th scope="col" class="text-center">Content</th>
          <th scope="col" class="text-center">#</th>
          <th scope="col" class="text-center">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos" :key="todo._id">
          <td stle="font-size: 18px">{{ todo.title }}</td>
          <td stle="font-size: 18px">{{ todo.content }}</td>
          <td class="text-center">
            <button class="btn btn-update">Update</button>
          </td>
          <td class="text-center">
            <button @click="handlDelete(todo._id)" class="btn btn-delete">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
export default {
  name: "ListToDo",
  setup() {
    const todos = ref([]);
    const title = ref("");
    const content = ref("");
    const isUpdate = ref(false);
    const todoUpdate = ref();

    const getAllTodo = async () => {
      try {
        const res = await axios.get(`http://localhost:3003/api/todo`);
        console.log(res.data);

        todos.value = res.data;
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(() => {
      getAllTodo();
    });

    const handleAddToDo = async (event) => {
      event.preventDefault();

      try {
        const addToDo = {
          title: title.value,
          content: content.value,
        };
        const res = await axios.post(
          "http://localhost:3003/api/todo/create/:userId",
          addToDo
        );
        console.log("res", res.data);
        title.value = "";
        content.value = "";
      } catch (err) {
        console.log(err);
      }
    };
    // update todo
    const updateTodo = async (data) => {
      if (data) {
        todoUpdate.value = data;
        title.value = data.title;
        content.value = data.content;
        isUpdate.value = true;
      }
    };

    const handleUpdate = async () => {
      try {
        const res = await axios.put(
          `http://localhost:3003/api/todo/update/${todoUpdate.value._id}`,
          { title: title.value, content: content.value }
        );
        console.log("res", res.data);
      } catch (error) {
        console.log(error);
      }
      title.value = "";
      content.value = "";
    };
    // delete todo
    const handlDelete = (id) => {
      try {
        const todo = axios.delete(
          `http://localhost:3003/api/todo/delete/${id}`
        );
        console.log("todo", todo);
        getAllTodo();
      } catch (error) {
        console.log(error);
      }
    };

    return {
      todos,
      title,
      content,
      isUpdate,
      todoUpdate,
      handleAddToDo,
      handlDelete,
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
  border: 2px solid rgb(0, 255, 98);
  border-radius: 5px;
  background: rgb(0, 255, 98);
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
