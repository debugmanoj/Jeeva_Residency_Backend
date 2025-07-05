import express from "express"
import dotenv from 'dotenv'
import cors from "cors"
import versionOneRouteIndex from "./src/routes/v1/versionOneRouteIndex.js"

dotenv.config()
const app=express()
app.use(cors({
  origin: '*',  // Allows all origins
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ for form-urlencoded


const PORT=process.env.PORT


app.use("/v1",versionOneRouteIndex)

app.listen(PORT, ()=>{
	console.log('Express app running on port ' + (process.env.PORT))
});


export default app;
