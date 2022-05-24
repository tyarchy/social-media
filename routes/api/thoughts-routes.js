const router = require('express').Router();
const {
    addThought,
    removeThought,
    getAllThought,
    updateThought
    
      
  } = require('../../controllers/thought-controller');


 router.route('/').post(addThought);
  router
  .route('userid/:thoughtId')
  .post(addThought)
  .delete(removeThought)
  .get(getAllThought);

  router
    .route('/:id')
    
    .put(updateThought)
    

  router
    .route('/:thoughtId/')
    .post(addThought)



  
  module.exports = router;
  