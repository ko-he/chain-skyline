import express from "express"
import { sessionHandler, userHandler } from "../presenter/handler"

const router = express.Router()

router.post('/user', userHandler.create)
router.post('/user/login', sessionHandler.login)

export default router
