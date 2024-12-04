<template>
    <div class="auth-container">
      <div class="auth-card">
        <h2>{{ isSignUp ? "Sign Up" : "Sign In" }}</h2>
        <form @submit.prevent="handleAuth">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <button type="submit" class="auth-button">
            {{ isSignUp ? "Sign Up" : "Sign In" }}
          </button>
        </form>
        <p>
          {{ isSignUp ? "Already have an account?" : "Don't have an account?" }}
          <span @click="toggleAuthMode">{{ isSignUp ? "Sign In" : "Sign Up" }}</span>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { auth } from "@/firebase/firebase";
  import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
  
  export default {
    name: "AuthView",
    setup() {
      const email = ref("");
      const password = ref("");
      const isSignUp = ref(false);
  
      const toggleAuthMode = () => {
        isSignUp.value = !isSignUp.value;
      };
  
      const handleAuth = async () => {
        try {
          if (isSignUp.value) {
            await createUserWithEmailAndPassword(auth, email.value, password.value);
            alert("Sign-up successful! Please sign in.");
            isSignUp.value = false;
          } else {
            await signInWithEmailAndPassword(auth, email.value, password.value);
            alert("Sign-in successful!");
            // Redirect to the main page
            window.location.href = "/";
          }
        } catch (error) {
          alert(error.message);
        }
      };
  
      return {
        email,
        password,
        isSignUp,
        toggleAuthMode,
        handleAuth,
      };
    },
  };
  </script>
  
  <style scoped>
  .auth-container {
    font-family: "Montserrat", sans-serif;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f1f5eb;
  }
  
  .auth-card {
    width: 350px;
    padding: 20px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .auth-card h2 {
    font-family: "Caprasimo", cursive;
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #065c36;
  }
  
  .form-group {
    font-family: "Montserrat", sans-serif;
    margin-bottom: 15px;
    text-align: left;
  }
  
  label {
    font-size: 0.9rem;
    font-weight: bold;
    color: #097d4c;
  }
  
  input {
    width: 100%;
    padding: 10px;
    font-size: 0.9rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .auth-button {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    font-weight: bold;
    background-color: #097d4c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .auth-button:hover {
    background-color: #065c36;
  }
  
  span {
    color: #097d4c;
    cursor: pointer;
    font-weight: bold;
  }
  </style>
  