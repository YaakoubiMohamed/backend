const { Schema } = require('mongoose');
const User = require('../models/user.model');
const Joi = require('joi');

exports.getVendeurs = async(req,res,next) => {
try{
    const users = await User.find({ role: "vendeur" });
    res.status(200).json({
        users,
    });
} catch (err){
    next(err);
}
};

exports.getClients = async(req,res,next) => {
    try{
        const users = await User.find({ role: "client" });
        res.status(200).json({
            users,
        });
    } catch (err){
        next(err);
    }
    };


// get a sigle user by id
exports.getUserById = async (req ,res , next) => {
    console.log(req.params.id);
    try{
        const user = await User.findById(req.params.id);
        if (!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(user)

    }catch(err){
        next(err);
    }
};


// Create a new user
exports.createUser = async (req, res, next) => {
    try{
        const schema = Joi.object({
            nom: Joi.string().required(),
            prenom: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            role: Joi.string().required(),
            telephone: Joi.string().required(),
            adresse: Joi.string().required(),
        });
        const {error} = schema.validate(req.body);
        if(error){
            const validationError = new Error(error.details[0].message);
            validationError.statusCode=400;
            throw validationError;
        }
        const user = new User(req.body);
        const result = await user.save();
        res.status(201).json(result);

    }catch (err){
        next(err);
    }
};



//Update a user by ID
exports.updateUser = async (req, res, next) => {
    try{
        const schema = Joi.object({
            nom: Joi.string(),
            prenom: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string(),
            role: Joi.string(),
            telephone: Joi.string(),
            adresse: Joi.string(),
        });
        const {error} = schema.validate(req.body);
        if(error){
            const validationError = new Error(error.details[0].message);
            validationError.statusCode=400;
            throw validationError;

        }
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        if (!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(user);
    }catch(err){
        next(err);
    }
};


//Delete a user by ID
exports.deleteUser = async (req ,res , next) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(204).json(user)

    }catch(err){
        next(err);
    }
};