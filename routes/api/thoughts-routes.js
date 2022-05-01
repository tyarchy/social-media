const router = require('express').Router();
const {
    addThought,
    removeThought    
  } = require('../../controllers/thought-controller');


 router.route("/:userId").post(addThought);
  router
  .route('userid/:thoughtId')
  .post(addThought)
  .delete(removeThought);

  
  module.exports = router;
  