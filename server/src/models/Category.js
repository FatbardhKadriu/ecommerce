const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
    name: {
        type:     String,
        required: true,
        trim:     true
    },
    slug: {
        type:     String,
        required: true,
        unique:   true
    },
    type: {
        type: String    
    },
    categoryImage: { 
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parentId: {
        type: String 
    }

}, { timestamps: true })

module.exports = model('Category', categorySchema)
