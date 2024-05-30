import express from "express";
import mongoose from "mongoose";
import userRoutes from "./Routes/User/auth.routes.js";
import hackerthon from "./Routes/Hackerthon/Hackerthon.routes.js"
import registrationform from "./Routes/Hackerthon/RegistrationForm.routes.js"
import bodyParser from "body-parser"
import dotenv from 'dotenv';
import cors from "cors"
dotenv.config();



mongoose.connect("mongodb+srv://shanvig819:palak@cluster7.qp4t2z6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster7", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB is connected"))
.catch(err => console.log("MongoDB connection error:", err));

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/hackerthon',hackerthon)
app.use('/registration',registrationform)

app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Hackathon Event Management API!" });
});

app.listen(5000, () => {
    console.log(`App listening on port 5000`);
});
