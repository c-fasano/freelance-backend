import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  email: {type: String, required: true, lowercase: true, unique: true},
  name: String,
},
{
  project: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }
  ],
client: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  }
],
},

{
    timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export {Profile}
