import { Profile } from "../models/profile.js";
import { Invoice } from "../models/invoice.js";
import { Project } from "../models/project.js";
import { Client } from "../models/client.js";


const create = async (req, res) => {
  try {
    req.body.creator = req.user.profile //change this to a field
    const invoice = await new Invoice(req.body)
    await invoice.save()
    await Profile.updateOne(
      { _id: req.user.profile },
      { $push: { invoice: invoice } }
    )
    
    await Project.update(
      {owner: req.user.profile },
      { $push: { invoiceList: invoice } }
    )
    return res.status(201).json(invoice)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const invoices = await Invoice.find({creator: req.user.profile })
      .sort({ dueDate: 'desc' })

    return res.status(200).json(invoices)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const show = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      
    return res.status(200).json(invoice)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    return res.status(200).json(updatedInvoice)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const deleteInvoice = async (req, res) => {
  try {
    //await Invoice.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.invoice.remove({ _id: req.params.id })
    const project = await Project.find({})
    project.forEach(element => {
      element.invoiceList.remove({ _id: req.params.id })
    });



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