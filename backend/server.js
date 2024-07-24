const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/recipes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const recipeSchema = new mongoose.Schema({
  name: String,
  allergies: String,
  difficulty: String,
  ingredients: [String],
  amounts: [Number],
  instructions: [String],
  duration: [Number]
});

const Recipe = mongoose.model('Recipe', recipeSchema, 'recipes'); // הוספנו את שם האוסף כאן

app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    console.log('Recipes fetched:', recipes); // הוסף לוג זה
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error); // הוסף לוג זה
    res.status(500).send(error);
  }
});

app.post('/recipes', async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    console.log('Recipe added:', newRecipe); // הוסף לוג זה
    res.json(newRecipe);
  } catch (error) {
    console.error('Error adding recipe:', error); // הוסף לוג זה
    res.status(500).send(error);
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
