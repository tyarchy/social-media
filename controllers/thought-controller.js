const { Thoughts } = require('../models');


const thoughtController = {
  
  // add thoughts
  addThought({ params, body }, res) {
    console.log(body);
    Thoughts.create(body)
      .then(({ _id }) => {
        return Thoughts.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { thought: _id } },
          { new: true }
        );
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'Nobody Cares' });
          return;
        }
        res.json(dbThoughtData);
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