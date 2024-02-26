<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useAuthStore } from "./stores/auth";
import { computed, onMounted } from "vue";

const authStore = useAuthStore();
const isConnected = computed(() => authStore.isConnected);
const router = useRouter();

onMounted(() => {
  authStore.loadAuthData();
});

const handleLogout = () => {
  authStore.logout();
  router.push("/");
};
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="50"
      height="50"
    />
    <div class="wrapper">
      <nav class="d-flex justify-content-between">
        <RouterLink v-if="!isConnected" to="/">Login</RouterLink>
        <RouterLink v-if="isConnected" to="/mytask"
          ><i class="bi bi-list-task"></i> My Task</RouterLink
        >
        <div>
          <a href="#" @click.prevent="handleLogout" v-if="isConnected"
            ><i class="bi bi-power"></i> Logout</a
          >
        </div>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
body {
  color: white;
}
header {
  line-height: 1.5;
  max-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  padding: 1em;
  background-color: rgb(4, 11, 7);
  z-index: 2;
}

.logo {
  display: block;
  margin: 0 auto 1em;
}

.wrapper {
  width: 100%;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
