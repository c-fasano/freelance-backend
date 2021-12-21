import { Profile } from '../models/profile.js'
import { Client } from '../models/client.js'

const create = async (req, res) => {
  try {
    req.body.clientOwner = req.user.profile
    const client = await new Client(req.body)
    await client.save()
    await Profile.updateOne(
      { _id: req.user.profile },
      { $push: { client: client } }
    )
    return res.status(201).json(client)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const index = async (req, res) => {
  try {
    const client = await Client.find({clientOwner: req.user.profile })
      

    return res.status(200).json(client)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const show = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
    return res.status(200).json(client)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    return res.status(200).json(updatedClient)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.client.remove({ _id: req.params.id })
    await profile.save()
    return res.status(204).end()
  } catch (err) {
    return res.status(500).json(err)
  }
}

const createNote = async (req, res) => {
  try {
    req.body.clientOwner = req.user.profile
    const client = await Client.findById(req.params.id)
    client.notes.push(req.body)
    await client.save()
    const newNote = client.notes[client.notes.length - 1]

    const profile = await Profile.findById(req.user.profile)
    newNote.clientOwner = profile

    return res.status(201).json(newNote)
  } catch (err) {
    res.status(500).json(err)
  }
}


const deleteNote = async (req, res) => {
  try {
    const client = await Client.findById(req.params.clientId)
    client.notes.remove({ _id: req.params.noteId })

    await post.save()
    return res.status(204).end()
  } catch (err) {
    res.status(500).json(err)
  }
}


export {
  createNote,
  deleteNote,

  create,
  index,
  show,
  update,
  deleteClient as delete
}