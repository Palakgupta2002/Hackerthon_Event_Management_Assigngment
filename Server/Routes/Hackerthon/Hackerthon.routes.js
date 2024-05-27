import express from "express"
import User from "../../Modals/auth.js"
const router = express.Router();
import hackerthonSchema from "../../Modals/hackerthonSchema.js"

const createHackerthon=async(req,res)=>{
    const { name, email, company, date, description, status } = req.body;
    try {
       
        const organizer = await User.findOne({email});
        if (!organizer) {
            return res.status(404).json({ message: 'Organizer not found' });
        }

       
        const newHackathon = new hackerthonSchema({
            name,
            organizerEmail: email,
            company,
            date,
            description,
            status,
        });

       
       if(organizer.role==="organizer"){
        const savedHackathon = await newHackathon.save();
        res.status(201).json({ message: 'Hackathon created successfully', hackathon: savedHackathon });
       }
       else{
        return res.status(404).json({ message: 'Organizer not found' });
       }

       
    } catch (error) {
        console.error('Error creating Hackathon:', error);
        res.status(500).json({ error: 'Error creating Hackathon' });
    }
}
router.post("/createHackerthon",createHackerthon)

export default router

