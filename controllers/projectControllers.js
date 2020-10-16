const { result } = require('lodash');
const Project = require('../models/project');
const bodyParser = require('body-parser')

const getProjects = async (req, res) => {
    try{
        const result = await Project.find();
        res.send(result);
    }
    catch(error){
        throw (error);
    }
}


const returnProjects = async (req, res) => {
    try{
        const result = await Project.find();
        return result;
    }
    catch(error){
        throw (error);
    }
}

const addProject = async (req, res) => {
    try{
        const {name, status, price, devs} = req.body;
        const project = new Project({name, status, price, devs})
        const result = await project.save();
        res.send(result);

    }
    catch(error){
        throw(error);
    }
}

const deleteProject = async (req, res) => {
    const _id = req.body._id;
    try{
        await Project.findByIdAndDelete(_id);
        const result = await returnProjects();
        res.send(result);
    }
    catch(error){
        throw (error)
    }
}

const editProject = async (req, res) => {
    const project = req.body;
    try{
        await Project.updateOne({_id: project._id}, project);
        getProjects(req, res);
    }
    catch(error){
        throw(error)
    }
}

module.exports = {
    getProjects, addProject, deleteProject, editProject
}