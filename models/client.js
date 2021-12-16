import mongoose from 'mongoose'

const clientSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  email: {
      type: Date, 
      required: true
  },

  projectList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }
  ]
}, { timestamps: true })

const Profile = mongoose.model('Profile', profileSchema)

export {
  Client
} 