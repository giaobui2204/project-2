<template>
  <div class="recipe-card" @click="goToRecipe">
    <img :src="recipe.image" alt="Recipe Image" class="recipe-image" />
    <h3 class="recipe-name">{{ recipe.name }}</h3>
    <p class="recipe-ingredients">
      Ingredients: {{ truncatedIngredients }}
    </p>
    <p class="recipe-difficulty">Difficulty:</p>
    <div class="stars">
      <span
        v-for="star in 5"
        :key="star"
        :class="['star', { active: star <= recipe.difficulty }]"
      >
        ★
      </span>
    </div>
    <button @click="$router.push(`/recipes/${recipe.id}`)" class="explore-button">
      Explore
    </button>

  </div>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  computed: {
    truncatedIngredients() {
      if (!Array.isArray(this.recipe.ingredients)) {
        return "No ingredients available.";
      }
      const truncated = this.recipe.ingredients.slice(0, 3).join(", ");
      return this.recipe.ingredients.length > 3
        ? `${truncated}, and more...`
        : truncated;
    },
  },
};
</script>


<style scoped>
.recipe-card {
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #fff;
  cursor: pointer;
  transition: transform 0.2s;
}

.recipe-card:hover {
  transform: scale(1.05);
}

.recipe-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.recipe-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px 0;
  text-align: center;
}

.recipe-ingredients,
.recipe-difficulty {
  margin: 10px;
  font-size: 0.9rem;
}

.stars {
  display: flex;
  justify-content: center;
  margin: 10px;
}

.star {
  font-size: 1.2rem;
  color: #ccc;
  margin: 0 2px;
}

.star.active {
  color: #f39c12;
}

.explore-button {
  background-color: #097d4c;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  margin: 10px auto;
  display: block;
  cursor: pointer;
  transition: background-color 0.3s;
}

.explore-button:hover {
  background-color: #065c36;
}
</style>
