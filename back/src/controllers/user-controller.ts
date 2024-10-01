import { Response, Request } from 'express'

import { addOneUser, deleteOneUser, editOneUser, findAllUsers, findOneUser } from '../services/user-services'



export const getUsers = async (req: Request, res: Response) => {
    const result = await findAllUsers();
    if (result.status !== 200) return res.status(404).json({ message: 'Ocurrió un error' });
    return res.json(result.users);
}


export const getOneUser = async (req: Request, res: Response) => {
    const userId = req.params.id
    const result = await findOneUser(userId);
    if (result.status !== 200) return res.status(404).json({ message: 'No se encuentra el usuario' });
    return res.json(result.user);
}

export const addUser = async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await addOneUser(userData);
    if (result!.status !== 201) return res.status(500).json({ message: "Ocurrió un error al agregar el usuario" });
    const newUser = result!.newUser
    return res.json({ message: 'Usuario agregado', newUser });
}

export const editUser = async (req: Request, res: Response) => {
    const userId = req.params.id
    const userData = req.body
    const result = await editOneUser(userId, userData);
    if (result.status !== 200) return res.status(404).json({ message: 'Ocurrió un error' });
    const editedUser = result.user
    return res.json({ message: 'Usuario actualizado', editedUser });
}

export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id
    const result = await deleteOneUser(userId);
    if (result.status !== 200) return res.status(404).json({ message: 'No se encuentra el usuario' });
    return res.json({ message: 'Usuario eliminado' });
}
