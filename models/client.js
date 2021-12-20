import mongoose from 'mongoose'

const Schema = mongoose.Schema

const noteSchema = new Schema(
  {
    note_text: {
      type: String,
      required: true
    },
    clientOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
  },
  { timestamps: true }
)

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
  
  clientOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  notes: [noteSchema],

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
}, { timestamps: true }),

const Client = mongoose.model('Client', clientSchema)

export {
  Client
} 