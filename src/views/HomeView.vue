<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-6">
        <div class="card h-100">
          <div class="row">
            <div class="col-6 mx-2">
              <img
                src="../assets/employee.jpg"
                alt="employee"
                width="100%"
                class="card-body my-1 p-0"
              />
              <p>
                <span style="color: red">*</span> Make sure to enter the correct
                login credentials provide by RNt
              </p>
            </div>
            <div class="col-5">
              <form @submit.prevent="handleSubmit" class="my-4 mx-3">
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    v-model="username"
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="password"
                  />
                </div>
                <div class="d-flex justify-content-end mb-2">
                  <button type="submit" class="btn btn-primary">
                    <i class="bi bi-box-arrow-in-right"></i> Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const authStore = useAuthStore();
    const username = ref("");
    const password = ref("");
    const router = useRouter();

    const handleSubmit = () => {
      const defaultAuthData = JSON.parse(localStorage.getItem("authData"));

      if (
        username.value === defaultAuthData.username &&
        password.value === defaultAuthData.password
      ) {
        authStore.setAuthData(username.value, password.value, true);
        router.push("/mytask");
      } else {
        alert("Les données de connexion ne correspondent pas");
      }
    };

    return {
      username,
      password,
      handleSubmit,
    };
  },
};
</script>
<style scoped>
p {
  font-size: 0.7em;
  color: gray;
  padding-top: 1em;
}
</style>
