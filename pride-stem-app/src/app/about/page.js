/**
 * About Page Wrapper
 * 
 * This is the route handler for /about
 * It imports and renders the AboutPage component.
 * 
 * The actual content and layout is in about.jsx
 * This wrapper keeps the routing clean and organized.
 */

import AboutPage from "./about";

export default function ConferencePage() {
  return (
      <AboutPage />
  );
}