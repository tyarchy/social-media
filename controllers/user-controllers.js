const { User } = require('../models');


const userController = {
   
    getUser(req, res) {
        User.find({})
          .populate({
            path: 'comments',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },

       // create user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

   // delete user
   deleteUser({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then(dbUserData => res.json(dbUserdata))
      .catch(err => res.json(err));
  }
      

};
module.exports = userController

