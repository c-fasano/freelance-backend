import mongoose from 'mongoose'

const Schema = mongoose.Schema



const invoiceSchema = new Schema({
  dateCreated: {
      type: Date, 
      required: true
  },
  dueDate: {
    type: Date, 
    required: false
},
  is_Paid: {
      type: Boolean,
      default: true
  },
  projectList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }
  ]
, 
clientList: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  }
]
}, { timestamps: true })

const Invoice = mongoose.model('Invoice', invoiceSchema)

export {
  Invoice
}