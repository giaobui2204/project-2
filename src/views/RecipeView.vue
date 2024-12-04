<script setup>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useRecipeStore } from "@/stores/recipes.js";

const recipeStore = useRecipeStore();
const route = useRoute();

const recipe = computed(() =>
  recipeStore.recipes.find((r) => r.id === route.params.id)
);

onMounted(() => {
  recipeStore.fetchRecipes();
});
</script>

<template>
  <div class="recipe-view-container">
    <header class="recipe-header">
      <h1>{{ recipe?.name }}</h1>
    </header>

    <div v-if="recipe" class="recipe-details">
      <!-- Recipe Image -->
      <img :src="recipe.image" alt="Recipe Image" class="recipe-image" />

      <!-- Recipe How-To -->
      <section class="how-to-section">
        <h2>How-to</h2>
        <p v-for="(step, index) in recipe.steps" :key="index">
          {{ step }}
        </p>
      </section>

      <!-- Recipe Ingredients -->
      <section class="ingredients-section">
        <h2>Ingredients</h2>
        <ul>
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
            {{ ingredient }}
          </li>
        </ul>
      </section>
    </div>

    <p v-else class="not-found">Recipe not found. Please check back later!</p>
  </div>
</template>

<style scoped>
.recipe-view-container {
  text-align: center;
  font-family: "Montserrat", sans-serif;
  background-color: #f7f2e7;
  min-height: 100vh;
  padding: 40px;
}

.recipe-header {
  font-family: "Caprasimo", cursive;
  font-size: 3rem;
  color: #097d4c;
  margin-bottom: 30px;
}

.recipe-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recipe-image {
  width: 80%;
  max-width: 600px;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.how-to-section,
.ingredients-section {
  width: 100%;
  max-width: 800px;
  text-align: left;
  margin-top: 20px;
}

h2 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #065c36;
}

p {
  font-size: 1rem;
  line-height: 1.5;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 5px;
}

.not-found {
  font-size: 1.2rem;
  color: #ff5c5c;
}
</style>
