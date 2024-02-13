const Workout = require('../models/workoutModel') 
const mongoose = require('mongoose')


const getWorkouts = async (req,res) => {
    const workout = await Workout.find({}).sort({createdBy : -1})
    res.status(200).json(workout); 
}

const getWorkout = async (req,res) => {
    const {id} = req.params
    const workout = await Workout.find({_id: id}) 

    if(!workout){
        return res.status(404).json({error : "No such Workout"})
    }
    
    res.status(200).json(workout)
}

const createWorkout = async (req,res) => {
    const {title, reps, load} = req.body 
    try{
    const workout = await Workout.create({title, reps, load})
    res.status(200).json(workout) 
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

const deleteWorkout = async (req,res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json("No such Workout")
    }

    const workout = await Workout.findOneAndDelete({_id: id}) 
    
    if(!workout){
        return res.status(400).json("No such workout")
    }

    res.status(200).json(workout)
}

const updateWorkout = async (req,res) => {
    const {id} = req.params  

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json("No such Workout")
    }

    const workout = await Workout.findOneAndUpdate({_id: id},{...req.body}) 

    if(!workout){
        return res.status(400).json("No such workout")
    }

    res.status(200).json(workout)
}

module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
};