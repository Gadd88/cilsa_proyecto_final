import { Schema, model } from 'mongoose'

const TaskSchema = new Schema({
    nombre:{
        type:String,
        required: true,
        trim: true
    },
    descripcion:{
        type:String,
        required: true,
        trim: true
    },
    estado:{
        type:String,
        required: true,
        enum: ['Pendiente', 'En progreso', 'Completada']
    },
    fecha_creacion:{
        type:Date,
        default: Date.now()
    },
    usuario_id:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    }
})

const TaskModel = model('tasks', TaskSchema)

export default TaskModel