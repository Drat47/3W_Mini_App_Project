const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');


router.post('/', async (req, res) => {
    try {
        const { userId, text, image } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const newPost = new Post({
            userId,
            username: user.username,
            text,
            image
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.put('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const { userId } = req.body;

        if (!post) return res.status(404).json({ msg: 'Post not found' });


        if (post.likes.includes(userId)) {

            post.likes = post.likes.filter(id => id.toString() !== userId);
        } else {

            post.likes.push(userId);
        }

        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post('/:id/comment', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const { userId, text } = req.body;

        if (!post) return res.status(404).json({ msg: 'Post not found' });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const newComment = {
            userId,
            username: user.username,
            text
        };

        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
