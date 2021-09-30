const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const authConfig = require("../../config/auth.json");
const mongo = require("mongoose");
const multer = require("multer");
const multerConfig = require("../../config/multer");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 90000,
  });
}

router.post(
  "/register",
  multer(multerConfig).single("file"),
  async (req, res) => {
    const { email, name, cep } = req.body; // uso o (ES6 Destructuring assignment) para obter o valor email do json enviado pela requisição do usúario
    const { filename: key } = req.file;

    try {
      if (await User.findOne({ email })) {
        // procuro pelo mesmo email do mongoDB, se existe ele retorna true que executa o bloco de comando condicional
        return res.status(400).send({ error: "User already exist!" }); // responde com um codigo de erro 400 (bad request) e com a mensagem 'user already exist'
      }

      const user = await User.create({
        name: name,
        email: email,
        password: req.body.password,
        cep: cep,
        picture: key,
      }); // constroi um documento (instância de um modelo) recebdo como parametros o json de requisição (o documento só reconhece os parametros definidos no schema)

      user.password = undefined;

      return res
        .status(200)
        .send({ user, token: generateToken({ id: user.id }) });
    } catch (err) {
      return res.status(400).send({ error: err });
    }
  }
);

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  const check_user = await User.findOne({ email })
    .select("+password")
    .select("+name");

  if (!check_user) {
    return res
      .status(404)
      .send(`The email "${email}" was not found in our system.`);
  }
  if (!(await (password === check_user.password))) {
    return res.status(403).send(`Incorrect Password!!`);
  }

  check_user.password = undefined;

  res.send({ check_user, token: generateToken({ id: check_user.id }) });
});

router.use(authMiddleware);

router.get("/consult", async (req, res) => {
  await User.findById(req.userId, function (err, arr) {
    if (err) {
      res.send(err);
    }
    if (arr != null) {
      res.json(arr);
    }
  });
});

module.exports = (app) => app.use("/auth", router);
