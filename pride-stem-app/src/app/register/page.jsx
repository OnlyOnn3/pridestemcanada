/**
 * Registration Page Wrapper
 * 
 * This is the route handler for /register
 * It simply imports and renders the RegistrationForm component.
 * 
 * This separation allows for:
 * - Clean organization (page route vs component logic)
 * - Potential future enhancements (adding layouts, loading states, etc.)
 * - Easier testing and maintenance
 * 
 * The actual registration logic is in RegistrationForm.jsx
 */

import RegistrationForm from "./RegistrationForm";

export default function RegistrationPage() {
    return (
        <RegistrationForm />
    );
}