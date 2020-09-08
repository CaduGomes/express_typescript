import { Request, Response, NextFunction } from "express";
import User from "../model/user";
import IRes from "../interfaces/response";
import bcrypt from "bcrypt";
import IError from "../interfaces/error";
import jwt from "jsonwebtoken";
import IUser from "../interfaces/user";

const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3m",
  });
};

const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET);
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { name, email, password } = req.body;

  const password_hash = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      email,
      name,
      password_hash,
      refresh_token: "no login",
    });

    return res
      .status(200)
      .json(<IRes>{ data: user, msg: "Cadastrado com Sucesso" });
  } catch (err) {
    next(<IError>{ status: 409, msg: "Email já cadastrado" });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).exec();

    if (!user?.email) {
      throw <IError>{ msg: "Email não cadastrado", status: 404 };
    }

    const passwordExists = await bcrypt.compare(password, user.password_hash);

    if (!passwordExists) {
      throw <IError>{ msg: "Senha incorreta", status: 422 };
    }

    const accessToken = await generateAccessToken(user._id);
    const refresh_token = await generateRefreshToken(user._id);

    await User.findOneAndUpdate({ email }, { refresh_token }, (err) => {
      if (err) {
        throw <IError>{
          msg: "Erro ao logar, tente novamente mais tarde!",
          status: 401,
        };
      }
    });

    return res.status(200).json(<IRes>{
      data: { name: user.name, email: user.email },
      msg: "Logado com sucesso",
      accessToken,
      refresh_token,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log(req.body);
  return res.json("Deslogou");
};

export const token = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { refresh_token } = req.body;
  try {
    if (!refresh_token) {
      throw <IError>{ msg: "Token não encontrado!", status: 401 };
    }

    const user = await User.findOne({ refresh_token });

    if (!user?._id) {
      throw <IError>{ msg: "Token inválido!", status: 401 };
    }

    const token = await generateAccessToken(user._id);

    return res.status(200).json(<IRes>{
      msg: "Novo token gerado!",
      token,
      data: <IUser>{ email: user.email, name: user.name },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
