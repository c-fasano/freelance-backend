import { Profile } from '../models/profile.js'
import { Client } from '../models/client.js'

const create = async (req, res) => {
  try {
    req.body.owner = req.user.profile
    const client = await new Client(req.body)
    await client.save()
    await Profile.updateOne(
      { _id: req.user.profile },
      { $push: { clients: client } }
    )
    return res.status(201).json(post)
  } catch (err) {
    return res.status(500).json(err)
  }
}

export {
  create,
}