import express from "express"
import router from "./router/router"

const app = express()

app.use(express.json())
app.use("/", router)

app.listen(8000, () => {
  console.log("listening on port 8000")
})

export default app