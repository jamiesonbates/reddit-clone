'use strict';

const express = require('express');
const router = express.Router();
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
          console.log(comment.post_id);
          if (post.id === comment.post_id) {
            post.allComments.push(comment);
          }
        }
      })
      // console.log(posts);
      res.send(posts);
    })
    .catch((err) => {
      next((err));
    })
});

module.exports = router;
