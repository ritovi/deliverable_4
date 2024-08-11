const catchError = require('../utils/catchError');
const Post = require('../models/Post');

const getAll = catchError(async(req, res) => {
    const results = await Post.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    req.body.userId = req.user.id;
    const result = await Post.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Post.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;

    const post =  await Post.findByPk(id);
    if(!post) return res.sendStatus(404);
    if(post.userId!==req.user.id) return res.status(403).json({error : "this post doesn't belong to you"})

    const result = await Post.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;

    const post =  await Post.findByPk(id);
    if(!post) return res.sendStatus(404);
    if(post.userId!==req.user.id) return res.status(403).json({error : "this post doesn't belong to you"})
    
    req.body.userId = req.user.id;
    const result = await Post.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}