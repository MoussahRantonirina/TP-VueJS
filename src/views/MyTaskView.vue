<template>
  <div class="container col-12">
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-9 col-sm-12 mb-3">
        <!-- Formulaire -->
        <div class="card bg-dark">
          <div class="row">
            <div class="col-7" id="cardP">
              <img
                src="../assets/pexels-alex-andrews.jpg"
                width="100%"
                height="100%"
                alt="andrews"
              />
              <div class="overlay" :class="{ 'active-overlay': showOverlay }">
                <div class="text"><h3>Update ?</h3></div>
              </div>
              <div
                class="overlay2"
                :class="{ 'hidden-overlay': !showOverlay2 }"
              >
                <div class="text"><h3>New Task ?</h3></div>
              </div>
            </div>
            <div class="col-5">
              <form @submit.prevent="handleSubmit" class="my-4 mx-3">
                <input class="mb-3" type="hidden" v-model="task.id" />
                <input
                  type="text"
                  class="form-control mb-3"
                  v-model="task.name"
                  placeholder="Nom de la tâche"
                  required
                />
                <textarea
                  type="text"
                  class="form-control mb-3"
                  v-model="task.description"
                  placeholder="Description"
                  required
                ></textarea>
                <select class="form-select mb-3" v-model="task.status">
                  <option value="A faire">A faire</option>
                  <option value="En Cours">En Cours</option>
                  <option value="Finis">Finis</option>
                </select>
                <div class="d-flex justify-content-center">
                  <button class="btn btn-primary w-50" type="submit">
                    <i class="bi bi-cloud-plus" v-if="isEditing"></i>
                    <i class="bi bi-plus-square" v-else></i>
                    {{ isEditing ? "Update" : "Add new" }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="card pt-3 px-1">
          <!-- Tableau des tâches -->
          <table class="table table-dark">
            <thead class="table-secondary">
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(task, index) in taskStore.tasks" :key="task.id">
                <td>{{ task.id }}</td>
                <td>{{ task.name }}</td>
                <td>{{ task.description }}</td>
                <td>{{ task.status }}</td>
                <td>
                  <button @click="editTask(index)" class="btn btn-secondary">
                    <i class="bi bi-pen"></i>
                  </button>
                  <button
                    @click="deleteTask(index)"
                    class="btn btn-danger mx-1"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";

const taskStore = useTaskStore();
const task = ref({ name: "", description: "", status: "A faire" });
const isEditing = ref(false);
const editingIndex = ref(null);
const showOverlay = ref(false);
const showOverlay2 = ref(true);

const handleSubmit = () => {
  if (isEditing.value) {
    taskStore.updateTask(editingIndex.value, task.value);
    isEditing.value = false;
    editingIndex.value = null;
    task.value = { name: "", description: "", status: "A faire" };
    showOverlay.value = false;
    showOverlay2.value = true;
  } else {
    taskStore.addTask(task.value);
    task.value = { name: "", description: "", status: "A faire" };
  }
};

const editTask = (index) => {
  task.value = { ...taskStore.tasks[index] };
  isEditing.value = true;
  editingIndex.value = index;
  showOverlay.value = true;
  showOverlay2.value = false;
};

const deleteTask = (index) => {
  taskStore.deleteTask(index);
};
</script>

<style scoped>
img {
  border-top-left-radius: 2%;
  border-bottom-left-radius: 2%;
}
.overlay {
  position: absolute;
  bottom: 0;
  left: 3%;
  right: 0;
  background-image: linear-gradient(transparent, rgba(4, 37, 17, 0.818));
  overflow: hidden;
  width: 95%;
  height: 0;
  transition: 0.5s ease;
  border-bottom-left-radius: 2%;
}
.overlay2 {
  position: absolute;
  bottom: 0;
  left: 3%;
  right: 0;
  background-image: linear-gradient(transparent, rgba(4, 37, 17, 0.818));
  overflow: hidden;
  width: 95%;
  height: 97%;
  transition: height 0.5s ease;
  border-bottom-left-radius: 2%;
}
.active-overlay {
  height: 97%;
  transition: 0.5s ease;
}
.hidden-overlay {
  height: 0% !important;
}
#cardP {
  position: relative;
  width: 50%;
}
.text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
