import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from './app.js'
import { User } from "./models/user.model.js"
import { createUser } from "./controllers/user.controller.js";

dotenv.config({
  path: './.env'
})

const createDefaultUser = async () => {
  try {
    await createUser({
      fullName: "Prateek Goel",
      profileImage: "",
      email: "prateekgoel25s2@gmail.com",
      password: "adminGAD@7248",
      username: "admin"
    })

  } catch (_) { }
}

connectDB().then(async () => {
  app.listen(process.env.PORT || 8000, () => console.log(`SERVER IS RUNNING AT PORT ${process.env.PORT}`))
  app.on("error", (error) => {
    console.log("ERROR: ", error);
    throw error;
  })

  await createDefaultUser()

}).catch((err) => { console.log("MONGODB CONNECTION FAILED!! ", err) })