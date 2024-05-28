import express from "express";
import Registration from "../../Modals/registrationSchema.js";

const router = express.Router();

const registrationForm = async (req, res) => {
    const { hackerthonId } = req.params;
    const { participantEmail, name, email, phone, experience, skills } = req.body;

   
    if (!hackerthonId || !participantEmail || !name || !email || !phone || !experience || !skills) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        
        const existingRegistration = await Registration.findOne({ hackerthonId, participantEmail });

        if (existingRegistration) {
            return res.status(400).json({ message: "User already registered for this hackathon" });
        }

        const newRegistration = new Registration({
            hackerthonId,
            participantEmail,
            name,
            email,
            phone,
            experience,
            skills,
            registeredAt: req.body.registeredAt 
        });

      
        await newRegistration.save();

       
        res.status(201).json({ message: "Registration successful", registration: newRegistration });
    } catch (error) {
       
        res.status(500).json({ message: "An error occurred during registration", error: error.message });
    }
};

router.post('/:hackerthonId', registrationForm);

export default router;
