import express from "express"
import User from "../../Modals/auth.js"
const router = express.Router();
import hackerthonSchema from "../../Modals/hackerthonSchema.js"

const createHackerthon = async (req, res) => {
    const { name, email, company, date, description } = req.body;

    try {
        const organizer = await User.findOne({ email });
        if (!organizer) {
            return res.status(404).json({ message: 'Organizer not found' });
        }

        const eventDate = new Date(date);
        const today = new Date();

        let status = '';
        if (eventDate > today) {
            status = 'upcoming';
        } else if (eventDate < today) {
            status = 'completed';
        } else {
            status = 'in-progress';
        }

        const newHackathon = new hackerthonSchema({
            name,
            organizerEmail: email,
            company,
            date,
            description,
            status,
        });

        if (organizer.role === "organizer") {
            const savedHackathon = await newHackathon.save();
            res.status(201).json({ message: 'Hackathon created successfully', hackathon: savedHackathon });
        } else {
            return res.status(403).json({ message: 'Unauthorized: Only organizers can create hackathons' });
        }

    } catch (error) {
        console.error('Error creating Hackathon:', error);
        res.status(500).json({ error: 'Error creating Hackathon' });
    }
};

router.post("/createHackerthon",createHackerthon);

const getAllHackerThons = async (req, res) => {
    try {
      const hackathons = await hackerthonSchema.find(); 
      res.status(200).json({ hackerthons: hackathons }); 
    } catch (error) {
      console.error('Error fetching hackathons:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  router.get("/getAllHackerthons",getAllHackerThons);

  const getEmailHackerThon = async (req, res) => {
    const organizerEmail = req.params.organizerEmail;
    try {
        const allHackerthon = await hackerthonSchema.find({ organizerEmail });
        if (!allHackerthon || allHackerthon.length === 0) {
            return res.status(404).json({ message: "No hackerthons found for the given email" });
        }
        return res.status(200).json({ hackerthons: allHackerthon });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "We are unable to fetch the data" });
    }
}

router.get('/getEmailHackerThon/:organizerEmail', getEmailHackerThon);


export default router

