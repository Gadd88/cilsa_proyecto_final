import { Schema, model } from 'mongoose'


const BookSchema = new Schema({
    title:{
        type:String,
        required: true,
        trim: true
    },
    pages:{
        type:Number,
        trim: true
    },
    genre:{
        type:String,
        required: true,
        enum: ['Fantasía', 'Ciencia ficción', 'Zombies', 'Terror', 'Ficción', 'Romance', 'Drama', 'Realismo mágico', 'Aventura']
    },
    cover:{
        type:String,
        trim: true
    },
    synopsis:{
        type:String,
        required: true,
        trim: true
    },
    year:{
        type:Number,
        trim: true
    },
    ISBN:{
        type: String,
        trim: true
    },
    price:{
        type:Number,
        required: true,
        trim: true
    },
    author: {
        type: String,
        trim: true
    }
})

BookSchema.methods.toJSON = function() {
   const { __v, _id, ...book  }  = this.toObject()
   return { book, _id: _id}
}

const BookModel = model('books', BookSchema)

export default BookModel