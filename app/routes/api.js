'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const knex = require('../../db');

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

router.patch('/:id', (req, res) => {
  const postId = req.params.id;
  console.log(postId);
  console.log(req.body);
  const { image_url, title, author, body } = req.body;
  console.log('here');
  console.log(image_url);
  console.log(title);
  console.log(author);
  console.log(body);
  let post;

  return knex('posts')
    .update({ image_url, title, author, body })
    .where('id', postId)
    .returning('*')
    .then((rawPost) => {
      console.log(rawPost);
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
