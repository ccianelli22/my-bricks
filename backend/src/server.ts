import { MongoClient } from "mongodb"
import http from "http"
import app from "./app"

const PORT = process.env.PORT || 3001

// MongoDB client
const client = new MongoClient(process.env.MONGOURI!, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
// create a new express server
const server = http.createServer(app)

const run = async () => {
	try {
		// Connect the client to the server
		await client.connect()
		app.locals.mongoDB = client.db("bricksDB")
		server.listen(PORT, () => {
			console.log(`Express server is running on ${PORT}`)
		})
		console.log("Connected successfully to server")
	} catch (e) {
		console.log(e)
	}
}

run().catch(console.dir)
process.on("SIGINT", async () => {
	// Ensures that the client will close when you finish/error
	await client.close(true)
	console.log("DB CLOSED")
	server.close()
})
