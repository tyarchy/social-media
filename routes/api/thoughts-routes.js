const router = require('express').Router();
const {
    addThought,
    removeThought    
  } = require('../../controllers/thought-controller');

 
  router
  .route('userid/:thoughtId')
  .put(addThought)
  .delete(removeThought);

  
  module.exports = router;
  