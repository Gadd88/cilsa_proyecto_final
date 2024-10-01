import UserModel from '../models/user-model'
import { TaskType } from './task-services'


export type UserType = {
    nombre: string,
    email: string,
    isAdmin: boolean
    tasks: TaskType[]
}

export const findAllUsers = async () => {
    const users = await UserModel.find();
    return {
        status: 200,
        users
    }
}


export const findOneUser = async (userId: string) => {
    const user = await UserModel.findById(userId);
    if (!user) return { status : 404};
    return {
        status: 200,
        user
    };
}

export const addOneUser = async (userData: UserType) => {
    try{
        const newUser = await UserModel.create(userData);
        return {
            status: 201,
            newUser
        }
    }catch(error){
        console.error(error)
    }
}

export const editOneUser = async (userId: string, userData: UserType) => {
    const { nombre, email, isAdmin, tasks } = userData;
    const user = await UserModel.findByIdAndUpdate(userId, { nombre, email, isAdmin, tasks });
    return {
        status: 200,
        user
    }
}

export const deleteOneUser = async (userId: string) => {
    await UserModel.findByIdAndDelete(userId);
    return {
        status: 200
    }
}
