import { Profile } from "../models/profile.js";
import { Invoice } from "../models/invoice.js";

const create = async (req, res) => {
  try {
    req.body.owner = req.user.profile //change this to a field
    const invoice = await new Invoice(req.body)
    await invoice.save()
    await Invoice.updateOne(
      { _id: req.user.profile },
      { $push: { invoices: invoice } }
    )
    return res.status(201).json(invoice)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const invoices = await Invoice.find({owner: req.user.profile })
      .sort({ dueDate: 'desc' })

    return res.status(200).json(invoices)
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
    return res.status(200).json(updatedProject)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const deleteInvoice = async (req, res) => {
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


export {
  create,
  index,
  show,
  update,
  deleteInvoice as delete,

}