import Task from "../models/Task.js"
import asyncWrapper from "../middleware/async.js"
import { createCustomErr } from "../errors/custom-errors.js"

const getAllTask =  asyncWrapper( async (req, res) =>
{
    const tasks = await Task.find({})
    res.status(200).json({tasks})
})

const createTask = asyncWrapper ( async (req, res) =>
{
    const task = await Task.create(req.body)
    res.status(201).json({task})
})

const getTask = asyncWrapper( async (req, res, next) =>
{    
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        
        if(!task)
        {
            return next(createCustomErr(`No task wit id : ${taskID}`, 404))
        }
        res.status(200).json({task})
})

const deleteTask = asyncWrapper( async (req, res) =>
{
        const {id: taskID} = req.params
        const task = await Task.findByIdAndDelete({_id:taskID})

        if(!task)
        {
            return next(createCustomErr(`No task wit id : ${taskID}`, 404))
        }
        res.status(200).json({task})
    
})


const updateTask = asyncWrapper( async (req, res) =>
{
        const {id: taskID} = req.params
        const task = await Task.findByIdAndUpdate({_id:taskID}, req.body, {new: true, runValidators: true,})

        if(!task)
        {
            return next(createCustomErr(`No task wit id : ${taskID}`, 404))
        }

        res.status(200).json({task})
    
})

export {getAllTask, createTask, getTask, updateTask, deleteTask}