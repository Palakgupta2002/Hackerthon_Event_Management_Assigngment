import express from "express"
import User from "../../Modals/auth"
const router = express.Router();

const createHackerthon=async(req,res)=>{
    const { name, organizerEmail, company, date, description, status } = req.body;
    try {
       
        const organizer = await User.findById(organizerId);
        if (!organizer) {
            return res.status(404).json({ message: 'Organizer not found' });
        }

       
        const newHackathon = new Hackerthon({
            name,
            organizerEmail: organizerEmail,
            company,
            date,
            description,
            status,
        });

       
        const savedHackathon = await newHackathon.save();

        res.status(201).json({ message: 'Hackathon created successfully', hackathon: savedHackathon });
    } catch (error) {
        console.error('Error creating Hackathon:', error);
        res.status(500).json({ error: 'Error creating Hackathon' });
    }
}
router.post("/createHackerthon",createHackerthon)

export default router

