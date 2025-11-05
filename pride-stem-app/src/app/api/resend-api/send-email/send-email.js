import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler() {
 const email = 'ishigamicm@gmail.com';
   try {
    const message = await resend.emails.send({
      from: 'sandbox@resend.dev',
      to: email,
      subject: 'Conference Registration Successful',
      html: `<p>Test Email</p>`,
    });
    console.log("Email sent successfully:", message);
  } 
  catch (err) {
    console.error('Couldnt send Email', err);
    res.status(500).json({ error: err.message })
  }
   
}

