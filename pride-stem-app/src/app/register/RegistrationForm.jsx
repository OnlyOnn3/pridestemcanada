"use client";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RegistrationForm() {
  return (
    <div className="bg-white p-4 rounded-3 shadow-sm">
      <h3 className="mb-4 text-center fw-bold" style={{ background: 'linear-gradient(90deg, #ff0080, #7928ca)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Conference Registration
      </h3>
      <form method="post" className="needs-validation" noValidate>
        <div className="mb-4">
          <label htmlFor="name-input" className="form-label fw-semibold">Full Name</label>
          <input 
            type="text" 
            name="name" 
            id="name-input" 
            className="form-control form-control-lg shadow-sm" 
            required 
          />
          <small id="name-help" className="form-text text-muted">This can be your preferred name.</small>
        </div>

        <div className="mb-4">
          <label htmlFor="email-input" className="form-label fw-semibold">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email-input" 
            className="form-control form-control-lg shadow-sm" 
            required 
          />
        </div>

        <div className="mb-4">
          <label htmlFor="occupation-input" className="form-label fw-semibold">Occupation</label>
          <select 
            name="occupation" 
            id="occupation-input" 
            className="form-select form-select-lg shadow-sm"
            required
          >
            <option value="">Select your occupation...</option>
            <option value="student">Student (CAD 50)</option>
            <option value="postdoc">Postdoc (CAD 100)</option>
            <option value="faculty">Faculty/Professional (CAD 200)</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="affiliation-input" className="form-label fw-semibold">Affiliation/Organization</label>
          <input 
            type="text" 
            name="affiliation" 
            id="affiliation-input" 
            className="form-control form-control-lg shadow-sm" 
            required 
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dietary-input" className="form-label fw-semibold">Dietary Restrictions</label>
          <textarea 
            name="dietary" 
            id="dietary-input" 
            className="form-control form-control-lg shadow-sm" 
            rows="3"
            placeholder="Please list any dietary restrictions or preferences..."
          ></textarea>
        </div>

        <div className="d-grid">
          <button 
            type="submit" 
            className="btn btn-lg fw-bold text-white"
            style={{
              background: 'linear-gradient(90deg, #ff0080, #7928ca)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => e.target.style.filter = 'brightness(1.1)'}
            onMouseOut={(e) => e.target.style.filter = 'brightness(1)'}
          >
            Submit Registration
          </button>
        </div>
      </form>
    </div>
  );

}