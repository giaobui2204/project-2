<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header class="header">
    <nav class="navbar">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/result" class="nav-link">Result</RouterLink>
      <RouterLink to="/recipes" class="nav-link">Recipes</RouterLink>
      <RouterLink to="/add-recipe" class="nav-link">Add Recipes</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
.header {
  background-color: #f1ead1;
  padding: 15px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.navbar {
  display: flex;
  justify-content: center;
  gap: 70px;
  font-family: 'Montserrat', sans-serif;
}

.nav-link {
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: 600;
  color: #097d4c;
  transition: color 0.3s, transform 0.3s;
}

.nav-link:hover {
  color: #006400;
  transform: scale(1.1);
}

.nav-link.router-link-active {
  font-weight: bold;
  color: #006400;
}
</style>
