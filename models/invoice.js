import mongoose from 'mongoose'

const Schema = mongoose.Schema



const invoiceSchema = new Schema({
  title: {
    type: String,
    required: true
},
  dateCreated: {
      type: Date, 
      required: true
  },
  dueDate: {
    type: Date, 
    required: false
},

  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },

  is_Paid: {
      type: Boolean,
      default: false
  },
  projectBilled: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }
  
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