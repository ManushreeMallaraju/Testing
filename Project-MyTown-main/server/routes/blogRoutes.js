const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const blog = require('../models/blog');

const blogRouter = express.Router();

const cors = require('./cors');

blogRouter.use(bodyParser.json());

blogRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200 })

    .post(cors.corsWithOptions, (req, res, next) => {
        let outArr = [];
            const obj = {
                name:req.body.name,
                blog:req.body.blog
            }
            console.log(obj);

            outArr.push(obj);
        blog.create(outArr)
            .then((message) => {
                console.log('Blog is stored: ', message);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(message);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

blogRouter.route('/:name')

    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200 })
    .get(cors.corsWithOptions, (req, res, next) => {
        const current_user = req.params.name.split(",");

        blog.find({ "name": { $in : current_user }})
            .then((data) => {
                console.log(data);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            }, err => next(err))
            .catch(err => next(err));
    });



module.exports = blogRouter;