import { defineStore } from 'pinia';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

export const useRecipeStore = defineStore('recipes', {
  state: () => ({
    recipes: [], // Stores all recipes fetched from the database
    searchQuery: '', // Stores the user's current search query
  }),

  getters: {
    // Filters recipes based on the search query
    filteredRecipes: (state) => {
      return state.searchQuery
        ? state.recipes.filter((recipe) =>
            recipe.name.toLowerCase().includes(state.searchQuery.toLowerCase())
          )
        : state.recipes;
    },
  },

  actions: {
    // Fetches recipes from the Firestore database
    async fetchRecipes() {
      try {
        const querySnapshot = await getDocs(collection(db, 'recipes'));
        this.recipes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Fetched recipes:', this.recipes); // Debugging log
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    },

    // Sets the search query for filtering recipes
    setSearchQuery(query) {
      this.searchQuery = query;
    },

    // Adds a new recipe to the Firestore database and updates the local state
    async addRecipe(recipe) {
      try {
        const docRef = await addDoc(collection(db, 'recipes'), recipe);
        console.log('Recipe added with ID:', docRef.id);

        // Push the new recipe to the local state
        this.recipes.push({
          id: docRef.id,
          ...recipe,
        });
      } catch (error) {
        console.error('Error adding recipe:', error);
      }
    },
  },
});
