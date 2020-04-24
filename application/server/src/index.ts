import express from "express"
import router from "./presenter/router"

const app = express()

app.use("/", router)

app.listen(3000, () => {
  console.log("listening on port 3000")
})

export default app