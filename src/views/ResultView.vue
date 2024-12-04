<template>
  <div class="result-container">
    <header class="result-header">
      <h1>Results for "{{ recipeStore.searchQuery || 'All Recipes' }}"</h1>
    </header>

    <div class="result-content">
      <div v-if="recipeStore.filteredRecipes.length > 0">
        <RecipeCard
          v-for="recipe in recipeStore.filteredRecipes"
          :key="recipe.id"
          :recipe="recipe"
        />
      </div>
      <p v-else>No recipes found for "{{ recipeStore.searchQuery }}".</p>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRecipeStore } from "@/stores/recipes.js";
import RecipeCard from "@/components/RecipeCard.vue";
import Footer from "@/components/footer.vue";

const recipeStore = useRecipeStore();

onMounted(() => {
  recipeStore.fetchRecipes();
});
</script>

<style scoped>
.result-container {
  text-align: center;
  font-family: "Montserrat", sans-serif;
  background-color: #f1f5eb;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.result-header {
  font-family: "Caprasimo", cursive;
  font-size: 2.5rem;
  font-weight: bold;
  color: #065c36;
  margin-bottom: 30px;
}

.result-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
  gap: 20px;
  width: 100%;
  max-width: 1200px; 
  padding: 20px;
  justify-items: center;
}
</style>