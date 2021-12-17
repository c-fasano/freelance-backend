import mongoose from 'mongoose'

const clientSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  email: {
      type: String, 
      lowercase: true,
      required: true
  },
  
  added_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },

  projectList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }
  ],

invoiceList: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice'
  }
]
}, { timestamps: true })

const Client = mongoose.model('Client', clientSchema)

export {
  Client
} 
