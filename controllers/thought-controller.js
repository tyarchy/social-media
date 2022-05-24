const { Thought, User } = require('../models');


const thoughtController = {



  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: 'thought',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },


  // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'thought',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: 'Not a thought with that ID!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // add thoughts
  addThought({ params, body }, res) {
    console.log("body", body);
    console.log("params", params);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbThoughtsData => {
        console.log(dbThoughtsData)
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thoughts!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  },
  //update thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then(dbThoughtsData => {
        console.log(dbThoughtsData)
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thoughts!' });
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