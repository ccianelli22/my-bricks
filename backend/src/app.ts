import express from "express"
import dotenv from "dotenv"
dotenv.config({ path: `${__dirname}/config/config.env` })

//Middleware
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"

// Routes
import login from "./routes/api/login"
import logout from "./routes/api/logout"
import register from "./routes/api/register"
import resetPassword from "./routes/api/resetPassword"
import enableDarkMode from "./routes/api/enableDarkMode"
import posts from "./routes/api/posts"
import myPosts from "./routes/api/myPosts"
import searchResults from "./routes/api/searchResults"

const app = express()

//App Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser(process.env.SECRETCOOKIE!))

// App Routes
app.use("/api/login", login)
app.use("/api/logout", logout)
app.use("/api/register", register)
app.use("/api/resetpassword", resetPassword)
app.use("/api/enabledarkmode", enableDarkMode)
app.use("/api/posts", posts)
app.use("/api/myposts", myPosts)
app.use("/api/searchresults", searchResults)
export default app
