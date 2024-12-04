<template>
  <div class="home-container">
    <!-- Title Section -->
    <header class="header">
      <h1 class="title">RECIPE FINDER</h1>
      <p class="subtitle">GOOD FOOD, GOOD TASTE</p>
    </header>

    <!-- Search Section -->
    <div class="search-section">
      <input
        type="text"
        placeholder="Find your own recipe"
        v-model="searchQuery"
        class="search-input"
      />
      <button class="search-button" @click="searchRecipes">
        <i class="fas fa-search"></i>
      </button>
    </div>

    <Footer />
  </div>
</template>

<script>
import { ref } from "vue";
import Footer from "@/components/footer.vue";
import { useRouter } from "vue-router";
import { useRecipeStore } from "@/stores/recipes.js";

export default {
  name: "HomeView",
  components: {
    Footer,
  },
  setup() {
    const searchQuery = ref(""); 
    const router = useRouter();
    const recipeStore = useRecipeStore();

    const searchRecipes = () => {
      if (searchQuery.value.trim() !== "") {
        recipeStore.setSearchQuery(searchQuery.value); 
        router.push({ name: "results" }); 
      }
    };

    return {
      searchQuery, 
      searchRecipes,
    };
  },
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Caprasimo&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Galada&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

/* Container and Layout */
.home-container {
  font-family: "Nunito", sans-serif;
  background-color: #f1ead1;
  color: #097d4c;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 0 20px;
}

/* Header Section */
.header {
  margin-top: 100px;
  text-align: center;
}

.title {
  font-family: 'Caprasimo', cursive;
  font-size: 8rem;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.subtitle {
  font-family: 'Galada', cursive;
  font-size: 3rem;
  font-weight: 100;
  margin-top: 0;
  letter-spacing: 1px;
}

/* Search Section */
.search-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
  width: 100%;
}

.search-input {
  width: 60%;
  max-width: 500px;
  padding: 15px 20px;
  font-size: 1.2rem;
  border: none;
  border-radius: 50px;
  outline: none;
  background-color: #cfeaca;
  color: #097d4c;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-input::placeholder {
  color: #097d4c;
}

.search-button {
  margin-left: -50px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #097d4c;
}
</style>
