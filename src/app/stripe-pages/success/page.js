import { useRouter } from "next/router";
import SendEmail from "../../api/send-email.jsx";
export default function Success() {
  const router = useRouter();
  const { email } = router.query;

  // Trigger email sending when the component mounts
  
  return <div>
    <h1>Stripe API Success Endpoint</h1>
    {email && <SendEmail email={email} />}
  
  </div>;
}