import mongoose from 'mongoose'

const Schema = mongoose.Schema

const taskSchema = new Schema(
  {
    task: {
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
      required: true
  },
  endDate: {
    type: Date, 
    required: true
},
  is_Active: {
      type: Boolean,
      default: true
  },

  taskList:[taskSchema],

  hourlyRate:{
    type: Number,
    required: true
  },
  hoursWorked:{
    type: Number,
    default: 0,
    min:0
  }
  ,
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

const Project = mongoose.model('Project', projectSchema)

export {
  Project
}