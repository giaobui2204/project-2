import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResultViewVue from '@/views/ResultView.vue'
import AddRecipeView from '@/views/AddRecipeView.vue'
import RecipeView from '@/views/RecipeView.vue'
import AuthView from '@/views/AuthView.vue'
import { auth } from '../firebase/firebase';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/result', name: 'results', component: ResultViewVue },
    { path: '/add-recipe', name: 'add-recipe', component: AddRecipeView },
    {
      path: "/recipes/:id",
      name: "recipes",
      component: RecipeView,
    },  
    { path: "/auth", name: "auth", component: AuthView },
  ],
});

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;

  if (!currentUser && to.name !== "auth") {
    next({ name: "auth" });
  } else {
    next();
  }
});

export default router
