const { result } = require('lodash');
const Card = require('../models/card');
const bodyParser = require('body-parser')

const getUsers = async (req, res) => {
    try{
        const result = await Card.find();
        res.send(result);
    }
    catch(error){
        throw (error);
    }
}


const returnUsers = async (req, res) => {
    try{
        const result = await Card.find();
        return result;
    }
    catch(error){
        throw (error);
    }
}

const addUser = async (req, res) => {
    try{
        const {name, email, company, description} = req.body;
        const card = new Card({name, email, company, description})
        const result = await card.save();
        res.send(result);

    }
    catch(error){
        throw(error);
    }
}

const deleteUser = async (req, res) => {
    const _id = req.body._id;
    try{
        await Card.findByIdAndDelete(_id);
        const result = await returnUsers();
        res.send(result);
    }
    catch(error){
        throw (error)
    }
}

const editUser = async (req, res) => {
    const user = req.body;
    console.log(user)
    try{
        await Card.updateOne({_id: user._id}, user);
        getUsers(req, res);
    }
    catch(error){
        throw(error)
    }
}

module.exports = {
    getUsers, addUser, deleteUser, editUser
}