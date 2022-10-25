const { sign_up, login, checkAuth, activateAccount } = require("../controllers/userController")
const { signupValidation, loginValidation, checkAuthValidation } = require("../middlewares/userValidation")

const router = require("express").Router()


router.post("/signUp", signupValidation, sign_up)
router.post ("/login", loginValidation, login)
router.get("/checkAuth", checkAuthValidation, checkAuth)

router.get("/activateAccount", activateAccount)

module.exports = router