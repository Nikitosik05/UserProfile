const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require("../models/userModel")
const {validationResult} = require('express-validator')
const Mailer = require('../services/mailService')
const uuid = require('uuid')
const UserDTO = require('../dtos/UserDto')



const sign_up = async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(401).json({status: false, errors: errors.array()})
  }

  const { email, name, password, surname } = req.body

  const emailCheck = await User.findOne({ email })
  if (emailCheck) {
    return res.json({ status: false, message: "User already signed up" })
  }

  const hashedPass = await bcrypt.hash(password, 10)
  const activationSecret = uuid.v4()
  await Mailer.sendActivationMail('nikita.yarmolenko@phymly.ck.ua', `http://localhost:5000/api/users/activateAccount?activationSecret=${activationSecret}`)

  const newUser = await new User({activationSecret, email, name, password: hashedPass, surname }).save()
  const user = new UserDTO(newUser)
  const token = jwt.sign({...user}, process.env.SECRET_JWT)



  res.json({ newUser: user, token })



  


}

const login = async (req, res) => {

  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(401).json({status:false, errors:errors.array()})
  }

  const { email, password } = req.body


  const foundUser = await User.findOne({ email })
  if (!foundUser) {
    return res.json({ status: false, message: "U need to signed up" })
  }


  const passwordCheck = await bcrypt.compare(password, foundUser.password)
  if(!passwordCheck) {
    return res.status(403).json({ status: false, message: "Pizdit' ne krasivo nonononon"})
  }
  const user = new UserDTO(foundUser)

  const token = jwt.sign({...user}, process.env.SECRET_JWT)

  return res.json({foundUser: user, token})
}


const checkAuth = async (req, res) => {

  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(401).json({status:false, errors:errors.array()})
  }

  const {token} = req.query
  console.log(token);

  const tokenVerify = jwt.verify(token, process.env.SECRET_JWT)
  if(tokenVerify){
    const user = await User.findById(tokenVerify.id)

    if(!user) {
      return res.status(403).json({status: false, message: 'account not found'})
    }
    const users = new UserDTO(user)

    return res.json({user: users, status:true});
  }
  return res.status(403).json({status: false, message: 'please, make relogin'})
}

const activateAccount = async (req, res) => {
  const {activationSecret = ''} = req.query
  if(!activationSecret) {
    return res.json({message: "Wrong url"})
  }

  const user = await User.findOne({activationSecret})
  if(!user) {
    return res.json({message: "Wrong url"})
  }
  user.isVerified = true
  await user.save()
  res.json({message: "You successfuly verified you account!"})


}

module.exports = { sign_up, login, checkAuth, activateAccount }