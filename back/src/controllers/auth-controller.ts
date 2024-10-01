import { Response, Request } from 'express'
import UserModel from '../models/user-model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (!user) {
        return res.status(401).json({ message: 'Credenciales incorrectas' })
    }
    if(user.isAdmin){
        if(password === user.password ){
            const token = jwt.sign({ user_id: user._id }, process.env.SECRET_JWT!, { expiresIn: '7d' })
            return res.json({ token: token, user })
        }else{
            return res.status(401).json({ message: 'Credenciales incorrectas' })
        }
    }else{
        const compareResult = await bcrypt.compare(password, user.password)
        if(!compareResult){
            return res.status(401).json({ message: 'Credenciales incorrectas' })
        }
    
        const token = jwt.sign({ user_id: user._id }, process.env.SECRET_JWT!, { expiresIn: '7d' })
        return res.json({ token: token, ...user })
    }
}