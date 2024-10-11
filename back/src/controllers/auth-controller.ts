import { Response, Request } from 'express'
import UserModel from '../models/user-model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { loginService, registerService } from '../services/auth-services'

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const result = await loginService(email, password)

    if (result.status !== 200) {
        return res.status(401).json({ message: 'Credenciales incorrectas' })
    }
    return res.json(result)
}

export const register = async (req: Request, res: Response) => {
    const result = await registerService(req.body)
    if(result.status !== 201) return res.status(500).json(result)
    return res.json(result)
}