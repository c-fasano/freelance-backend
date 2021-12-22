import { Profile } from "../models/profile.js";
import { Project } from "../models/project.js";

const create = async (req, res) => {
  try {
    req.body.owner = req.user.profile 
    const project = await new Project(req.body)
    await project.save()
    await Profile.updateOne(
      { _id: req.user.profile },
      { $push: { project: project } }
    )
    const populated = await project.populate('client')
    return res.status(201).json(populated)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const projects = await Project.find({owner: req.user.profile })
    .populate('client')  
    .sort({ is_Active: 'desc' })

    return res.status(200).json(projects)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const show = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      
    return res.status(200).json(project)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    const populatedProject = await updatedProject.populate('client')
    return res.status(200).json(populatedProject)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    console.log(profile)
    profile.project.remove({ _id: req.params.id })
    await profile.save()
    return res.status(204).end()
  } catch (err) {
    return res.status(500).json(err)
  }
}
const createTask = async (req, res) => {
  try {
    req.body.taskOwner = req.user.profile
    const project = await Project.findById(req.params.id)
    project.taskList.push(req.body)
    await project.save()
    const newTask = project.taskList[project.taskList.length - 1]


    return res.status(201).json(newTask)
  } catch (err) {
    res.status(500).json(err)
  }
}
const deleteTask = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)
    console.log(req.params.taskId)
    project.taskList.remove({ _id: req.params.taskId })

    await project.save()
    return res.status(204).end()
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateTaskStatus = async (req, res) => {
  try {
    const updatedProject = await Project.findById(req.params.projectId)
    console.log('updatebody', req.body)
    
    const idx = updatedProject.taskList.findIndex(
      (task) => task._id.equals(req.params.taskId)
    )
    console.log(idx)

    updatedProject.taskList[idx].status = req.body.status

    await updatedProject.save()
    return res.status(200).json(updatedProject.taskList[idx])

  } catch (err) {
    res.status(500).json(err)
  }
}

const toggleActive = async (req, res) => {
  console.log("hitting")
  try {
    const updatedProject = await Project.findById(req.params.id)
    console.log(updatedProject)
    updatedProject.is_Active = !updatedProject.is_Active 

    await updatedProject.save()
    return res.status(200).json(updatedProject)

  } catch (err) {
    res.status(500).json(err)
  }
}

const addHours = async (req, res) => {
  try {
    const updatedProject = await Project.findById(req.params.id)
    updatedProject.hoursWorked = req.body.hoursWorked
    await updatedProject.save()
    return res.status(200).json(updatedProject)
  } catch (error) {
    res.status(500).json(error)
  }
}




export {
  create,
  index,
  show,
  update,
  deleteProject as delete,
  toggleActive,
  createTask,
  deleteTask,
  updateTaskStatus,
  addHours
}