<template>
  <div class="add-recipe-container">
    <h1 class="add-recipe-header">Add a New Recipe</h1>
    <form @submit.prevent="submitRecipe" class="add-recipe-form">
      <!-- Recipe Name -->
      <div class="form-group">
        <label for="name">Recipe Name:</label>
        <input type="text" id="name" v-model="recipe.name" required />
      </div>

      <!-- Ingredients -->
      <div class="form-group">
        <label>Ingredients:</label>
        <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="dynamic-input">
          <input
            type="text"
            v-model="recipe.ingredients[index]"
            placeholder="Add an ingredient"
          />
          <button type="button" @click="removeIngredient(index)">-</button>
        </div>
        <button type="button" @click="addIngredient" class="add-button">+ Add Ingredient</button>
      </div>

      <!-- Steps -->
      <div class="form-group">
        <label>Steps:</label>
        <div v-for="(step, index) in recipe.steps" :key="index" class="dynamic-input">
          <input
            type="text"
            v-model="recipe.steps[index]"
            placeholder="Add a step"
          />
          <button type="button" @click="removeStep(index)">-</button>
        </div>
        <button type="button" @click="addStep" class="add-button">+ Add Step</button>
      </div>

      <!-- Image URL -->
      <div class="form-group">
        <label for="image">Image URL:</label>
        <input type="url" id="image" v-model="recipe.image" required />
      </div>

      <!-- Difficulty -->
      <div class="form-group">
        <label>Difficulty:</label>
        <div class="stars">
          <span
            v-for="star in 5"
            :key="star"
            @click="updateDifficulty(star)"
            :class="['star', { active: star <= recipe.difficulty }]"
          >
            ★
          </span>
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="submit-button">Add Recipe</button>
    </form>
  </div>
</template>

<script>
import { useRecipeStore } from "@/stores/recipes.js";

export default {
  name: "AddRecipeView",
  data() {
    return {
      recipe: {
        name: "",
        ingredients: [""], // Array for dynamic ingredient inputs
        steps: [""], // Array for dynamic step inputs
        image: "",
        difficulty: 0,
      },
    };
  },
  methods: {
    async submitRecipe() {
      const recipeStore = useRecipeStore();
      await recipeStore.addRecipe(this.recipe);
      this.$router.push("/result");
    },
    updateDifficulty(star) {
      this.recipe.difficulty = star;
    },
    addIngredient() {
      this.recipe.ingredients.push("");
    },
    removeIngredient(index) {
      this.recipe.ingredients.splice(index, 1);
    },
    addStep() {
      this.recipe.steps.push("");
    },
    removeStep(index) {
      this.recipe.steps.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.add-recipe-container {
  text-align: center;
  font-family: "Montserrat", sans-serif;
  background-color: #f1ead1; 
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
}

.add-recipe-header {
  font-family: "Caprasimo", cursive;
  font-size: 3.5rem;
  margin-bottom: 40px;
  color: #097d4c;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.add-recipe-form {
  width: 100%;
  max-width: 800px;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.form-group {
  margin-bottom: 25px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 1.1rem;
  color: #065c36;
}

input {
  width: 100%;
  padding: 12px 15px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
  border-color: #097d4c;
  box-shadow: 0 0 8px rgba(9, 125, 76, 0.4);
}

.dynamic-input {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.dynamic-input input {
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-right: 10px;
}

.dynamic-input button {
  padding: 8px 12px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background-color: #ff6b6b;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dynamic-input button:hover {
  background-color: #ff3b3b;
}

.add-button {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 15px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  background-color: #097d4c;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.add-button:hover {
  background-color: #065c36;
  transform: scale(1.05);
}

.stars {
  display: flex;
  margin-top: 15px;
  justify-content: center;
}

.star {
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  margin-right: 5px;
  transition: color 0.3s, transform 0.2s;
}

.star.active {
  color: #f39c12;
  transform: scale(1.2);
}

.submit-button {
  width: 100%;
  padding: 15px;
  font-size: 1.3rem;
  font-weight: bold;
  background-color: #097d4c;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.submit-button:hover {
  background-color: #065c36;
  transform: translateY(-3px);
}

.submit-button:active {
  transform: translateY(0);
}
</style>

