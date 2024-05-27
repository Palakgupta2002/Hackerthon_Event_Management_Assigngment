import express from "express";
import mongoose from "mongoose";
import userRoutes from "./Routes/User/auth.routes.js";


mongoose.connect('mongodb+srv://shanvig819:palak@cluster7.qp4t2z6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster7')
.then(() => console.log("MongoDB is connected"))
.catch(err => console.log(err));

const app = express();
app.use(express.json());

app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Hackathon Event Management API!" });
});

app.listen(5000, () => {
    console.log(`App listening on port 5000`);
});
