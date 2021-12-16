import mongoose from 'mongoose'

const Schema = mongoose.Schema

const taskSchema = new Schema(
  {
    task_text: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'Not-started',
      enum: ['Not-started','In-Progress','Complete']
    },
  },
  { timestamps: true }
)


const projectSchema = new Schema({
  title: {
      type: String,
      required: true
  },
  startDate: {
      type: Date, 
      required: false
  },
  endDate: {
    type: Date, 
    required: false
},
  is_Active: {
      type: Boolean,
      default: true
  },

  tasks:[taskSchema],

  hourlyRate:{
    type: Number,
    required: true
  },

  clientList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client'
    }
  ]
, 
invoiceList: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice'
  }
]
}, { timestamps: true })

const Profile = mongoose.model('Profile', profileSchema)

export {
  Project
}