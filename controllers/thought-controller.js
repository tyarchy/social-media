const { Thought, User } = require('../models');


const thoughtController = {
  
  // add thoughts
  addThought({ params, body }, res) {
    console.log("body");
    Thought.create(body)
        .then((_id) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbThoughtsData => {
          console.log(dbThoughtsData)
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thinking!' });
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.json(err));
},
 // remove reply
 removeThought({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.ThoughtId },
      { $pull: { thought: { ThoughtId: params.ThoughtId } } },
      { new: true }
    )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController

// creats/post
// gets
// update
// delete