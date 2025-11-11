/**
 * Payment Failure Page
 * 
 * This page is displayed when a user cancels or fails Stripe payment.
 * User is redirected here from Stripe if they:
 * - Click the "back" button on Stripe checkout
 * - Close the payment window
 * - Payment fails for any reason
 * 
 * URL: /stripe-pages/failure
 * 
 * Note: Currently shows a basic message. Could be enhanced with:
 * - Better styling and messaging
 * - Link back to registration form
 * - Contact support information
 * - Reason for failure (if available from Stripe)
 */

export default function Failure() {
  return (
    <div>
      <h1>Payment Cancelled</h1>
      <p>Your payment was not completed. Your registration was not processed.</p>
      <p>If you'd like to try again, please return to the registration page.</p>
    </div>
  );
}