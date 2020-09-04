import { Request, Response } from "express";
import User from "../model/user";
import IRes from "../interfaces/response";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateAccessToken = (userId: object) => {
  return jwt.sign({ userId }, process.env.SECRET, {
    expiresIn: "2h",
  });
};

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, email, password } = req.body;

  const password_hash = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ email, name, password_hash });
    return res
      .status(200)
      .json(<IRes>{ data: user, msg: "Cadastrado com Sucesso" });
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json(<IRes>{ msg: "Email já cadastrado" });
    return res.status(500).json(<IRes>{ msg: "Server Error" });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user?.email) {
      return res.status(404).json(<IRes>{ msg: "Email não cadastrado" });
    }

    const passwordExists = await bcrypt.compare(password, user.password_hash);

    if (!passwordExists) {
      return res.status(422).json(<IRes>{ msg: "Senha incorreta" });
    }

    const token = await generateAccessToken(user._id);

    return res.status(200).json(<IRes>{
      data: { name: user.name, email: user.email },
      msg: "Logado com sucesso",
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(<IRes>{ msg: "Server Error" });
  }
};

export const logout = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log(req.body);
  return res.json("Deslogou");
};
