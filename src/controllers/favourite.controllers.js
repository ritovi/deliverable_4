const catchError = require('../utils/catchError');
const Favourite = require('../models/Favourite');

const getAllFavou = catchError(async(req, res) => {
    const id = req.user.id;
    const results = await Favourite.findAll({where : {id} });
    return res.json(results);
});

const createFavou = catchError(async(req, res) => {
    id = req.user.id;
    req.body.userId = req.user.id;
    const result = await Favourite.create(req.body);
    return res.status(201).json(result);
});

const removeFavou = catchError(async(req, res) => {
    const { id } = req.params;
    //console.log(id);
    const favou =  await Favourite.findByPk(id);
    if(!favou) return res.sendStatus(404);
    if(favou.userId!==req.user.id) return res.status(403).json({error : "You didn't save this post as a favorite"})

    const result = await Favourite.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});


module.exports = {
    getAllFavou,
    createFavou,
    removeFavou
}