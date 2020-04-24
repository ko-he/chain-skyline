import express from "express"
import { sessionHandler } from "./handler"

const router = express.Router()

router.get('/', sessionHandler.login)

export default router
