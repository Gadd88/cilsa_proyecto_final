import { Schema, model } from 'mongoose'


const UserSchema = new Schema({
    nombre:{
        type:String,
        required: true,
        trim: true
    },
    email:{ 
        type:String,
        required: true,
        trim: true
    },
    isAdmin:{ 
        type:Boolean,
        default: false
    },
    password:{
        type:String,
        required: true,
        trim: true
    },
    tasks:{
        type:[{
            type: Schema.Types.ObjectId,
            ref: 'tasks'
        }],
        default: []
    }
})

UserSchema.methods.toJSON = function() {
   const { __v, password, ...user  }  = this.toObject()
   return { user }
}

const UserModel = model('books', UserSchema)

export default UserModel