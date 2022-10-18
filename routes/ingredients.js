const express = require('express');
const ingredient = require('../models/ingredient');
const router = express.Router();
const Ingredient = require('../models/ingredient');

// get all ingredients
router.get('/', async (req, res) => {
  let searchOptions = {}
  if(req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const ingredients = await Ingredient.find(searchOptions)
    res.render('ingredients/index', {
      ingredients: ingredients, 
      searchOptions: req.query })
  } catch {
    res.redirect('/');
  }
})

// new ingredients (form)
router.get('/new', (req, res) => {
  res.render('ingredients/new', { ingredient: new Ingredient() })
});

// creating/add ingredient route
router.post('/', async (req, res) => {
  const ingredient = new Ingredient({
    name: req.body.name
  })
  try {
    const newIngredient = await ingredient.save();
    // res.redirect(`ingredients/${newIngredient.id}`);
    res.redirect(`ingredients`);
  } catch (error) {
    res.render('ingredients/new', {
      ingredient: ingredient,
      errorMessage: 'Error adding ingredient'
    })
  }
});

module.exports = router;