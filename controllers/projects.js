import { Profile } from "../models/profile.js";
import { Project } from "../models/project.js";

const create = async (req, res) => {
  try {
    req.body.added_by = req.user.profile
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
    const projects = await Project.find({})
      .sort({ startDate: 'desc' })

    return res.status(200).json(projects)
  } catch (err) {
    return res.status(500).json(err)
  }
}



export {
  create,
  index,
}