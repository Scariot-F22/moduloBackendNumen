const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, unique : true, lowercase: true, required: true },
    price: { type: String, required: true },
    stock: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' } //RELACIÓN ONE TO MANY
})

module.exports = mongoose.model('Product', productSchema)