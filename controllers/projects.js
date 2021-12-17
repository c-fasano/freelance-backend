import { Profile } from "../models/profile.js";
import { Project } from "../models/project.js";

const create = async (req, res) => {
  try {
    req.body.owner = req.user.profile //change this to a field
    const project = await new Project(req.body)
    await project.save()
    await Profile.updateOne(
      { _id: req.user.profile },
      { $push: { projects: project } }
    )
    return res.status(201).json(project)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const projects = await Project.find({owner: req.user.profile })
      .sort({ startDate: 'desc' })

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
    const updateData = { is_resolved: true }
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
    return res.status(200).json(updatedProject)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.projects.remove({ _id: req.params.id })
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


    return res.status(201).json(newComment)
  } catch (err) {
    res.status(500).json(err)
  }
}
const deleteTask = async (req, res) => {
  try {
    const project = await Project.findById(req.params.taskId)
    project.taskList.remove({ _id: req.params.taskId })

    await post.save()
    return res.status(204).end()
  } catch (err) {
    res.status(500).json(err)
  }
}

export {
  create,
  index,
  show,
  update,
  deleteProject as delete,
  createTask,
  deleteTask
}