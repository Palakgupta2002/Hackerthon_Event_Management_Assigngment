import express from 'express'
import Registration from '../../Modals/registrationSchema.js'
import nodemailer from 'nodemailer'
import hackerthonSchema from '../../Modals/hackerthonSchema.js'
import dotenv from 'dotenv';
import registrationSchema from '../../Modals/registrationSchema.js';

dotenv.config();

const router = express.Router()

const registrationForm = async (req, res) => {
  const { hackerthonId } = req.params
  const { participantEmail, name, phone, experience, skills } = req.body

  if (
    !hackerthonId ||
    !participantEmail ||
    !name ||
    !phone ||
    !experience ||
    !skills
  ) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  try {
    const existingRegistration = await Registration.findOne({
      hackerthonId,
      participantEmail,
    })
    const hackerthonData = await hackerthonSchema.findOne({ _id: hackerthonId })

    if (existingRegistration) {
      return res
        .status(400)
        .json({ message: 'User already registered for this hackathon' })
    }

    const newRegistration = new Registration({
      hackerthonId,
      participantEmail,
      name,
      phone,
      experience,
      skills,
      registeredAt: new Date(),
    })

    await newRegistration.save()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
    const mailOption = {
      from: {
        name: 'Hackerthon Event',
        address: process.env.EMAIL_USER,
      },
      to: [participantEmail],
      subject: 'Confirmation mail from hackerthon team',
      text: `Dear ${name},

You have successfully registered for the hackathon.

Hackathon Details:
Name: ${hackerthonData.name}
Date: ${hackerthonData.date}

Description: ${hackerthonData.description}

Thank you for registering!

Best regards,
Hackerthon Team`,
      html: `<b>Dear ${name},</b><br><br>
You have successfully registered for the hackathon.<br><br>
<b>Hackathon Details:</b><br>
Name: ${hackerthonData.name}<br>
Date: ${new Date(hackerthonData.date).toLocaleString()}<br>
Description: ${hackerthonData.description}<br><br>
Thank you for registering!<br><br>
Best regards,<br>
<b>Hackerthon Team</b>`,
    }
    const sendMail = async (transporter, mailOption) => {
      try {
        await transporter.sendMail(mailOption)
        res.json({ message: 'Confiramtion mail send your registered mail id' })
      } catch (error) {
        console.log('error occurs')
      }
    }
    sendMail(transporter, mailOption)
  } catch (error) {
    res
      .status(500)
      .json({
        message: 'An error occurred during registration',
        error: error.message,
      })
  }
}

router.post('/:hackerthonId', registrationForm)


const registeredParticipantData = async (req, res) => {
    const { participantEmail } = req.params;
    let data = [];
    
    try {
        const findUserRegisHackerthons = await registrationSchema.find({ participantEmail });
        
        if (!findUserRegisHackerthons || findUserRegisHackerthons.length === 0) {
            return res.status(404).json({ message: "Participant not found" });
        }

        const hackerthonDetailsPromises = findUserRegisHackerthons.map(async (registration) => {
            const hackerthonDetails = await hackerthonSchema.findById(registration.hackerthonId);
            return hackerthonDetails;
        });

        data = await Promise.all(hackerthonDetailsPromises);

        res.json({ message: "Data fetched successfully", data });
    } catch (error) {
        console.log("Error occurred:", error);
        res.status(500).json({ message: "An error occurred while fetching participant data", error: error.message });
    }
};


router.get("/:participantEmail",registeredParticipantData)

export default router
