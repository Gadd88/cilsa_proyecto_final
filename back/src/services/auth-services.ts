import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user-model";

type TUser = {
    email: string;
    password: string;
    nombre: string
}
const loginService = async (email: string, password: string) => {
    const user = await UserModel.findOne({ email });
    // console.log(user)
    if (!user) {
        return {
            status: 403,
            message: "Usuario o contraseña incorrectos",
        };
    }
    if(!user.isAdmin){
        const compareResult = await bcrypt.compare(password, user.password);
        if (!compareResult) {
            return {
                status: 403,
                message: "Usuario o contraseña incorrectos",
            };
        }
    }
    const token = jwt.sign({ user_id: user._id }, 'cilsa', {
        expiresIn: "7d",
    });

    return {
        status: 200,
        user,
        token,
    }
};

const registerService = async (userData: TUser ) => {
    const { email, password, nombre } = userData;
    const user = await UserModel.findOne({ email });
    if (user) {
        return {
            status: 500,
            message: "El usuario ya existe",
        };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
        email,
        nombre,
        password: hashedPassword,
    });
    const token = jwt.sign({ user_id: newUser._id }, 'cilsa', {
        expiresIn: "7d",
    });
    return {
        status: 201,
        user: newUser,
        token,
    };
};

export { loginService, registerService };