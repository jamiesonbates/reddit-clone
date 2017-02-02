'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const knex = require('../../db');

// Get all posts and their comments
router.get('/', (req, res) => {
  let posts;

  return knex('posts')
    .then((rawPosts) => {
      posts = rawPosts;
      return knex('comments')
    })
    .then((comments) => {
      posts.forEach((post) => {
        post.allComments = [];
        for (const comment of comments) {
          if (post.id === comment.post_id) {
            post.allComments.push(comment);
          }
        }
      })

      res.send(posts);
    })
    .catch((err) => {
      next((err));
    })
});


// Get one post and its comments
router.get('/:id', (req, res) => {
  const postId = req.params.id;
  let post;

  return knex('posts')
    .where('id', postId)
    .then((rawPost) => {
      post = rawPost[0];

      return knex('comments')
        .where('post_id', postId)
    })
    .then((comments) => {
      post.allComments = comments;

      res.send(post);
    })
    .catch((err) => {
      console.log(err);
    })
})

// Create new post
router.post('/post', (req, res) => {
  const post = req.body;

  return knex('posts')
    .insert(post)
    .returning('*')
    .then((newPost) => {
      res.send(newPost[0]);
    });
})

// Add comment for one post
router.post('/comment/', (req, res) => {
  const post = req.body;
  console.log(post);

  return knex('comments')
    .insert({ post_id: post.id, content: post.newComment })
    .returning('*')
    .then((comment) => {
      res.send(comment);
    })
    .catch((err) => {
      console.log(err);
    })
})

// Update vote_count of one post
router.patch('/votes/', (req, res) => {
  const vote_count = req.body.vote_count;
  const id = req.body.id;

  return knex('posts')
    .update({ vote_count })
    .where('id', id)
    .returning('*')
    .then((post) => {
      console.log(post);
      res.send(post);
    })
    .catch((err) => {
      console.log(err);
    })
})

// Update one post
router.patch('/:id', (req, res) => {
  const postId = req.params.id;
  const { image_url, title, author, body } = req.body;
  let post;

  return knex('posts')
    .update({ image_url, title, author, body })
    .where('id', postId)
    .returning('*')
    .then((rawPost) => {
      post = rawPost[0];

      return knex('comments')
        .where('post_id', postId)
    })
    .then((comments) => {
      post.allComments = comments;

      res.send(post);
    })
    .catch((err) => {
      console.log(err);
    })
})

module.exports = router;
