const router = require('express').Router();
const {
  getUser,
  createUser,
  deleteUser,
} = require('../../controllers/user-controllers');

router
  .route('/')
  .get(getUser)
  .post(createUser)
  .delete(deleteUser);

module.exports = router;