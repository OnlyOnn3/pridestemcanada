import "bootstrap/dist/css/bootstrap.min.css"

export default function RegistrationPage() {
    return (
        <>
            <h2>Test Registration Form</h2>
            <RegistrationForm />
        </>
    );
}

function RegistrationForm() {
    return (
        <form method="post" >
            <div className="form-group">
                <label htmlFor="name-input">Full Name</label>
                <input type="text" name="name" id="name-input" className="form-control" />
                <small id="name-help" className="form-text text-muted">This can be your preferred name.</small>
            </div>
            <div className="form-group">
                <label htmlFor="email-input">Email</label>
                <input type="text" name="email" id="email-input" className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="occupation-input">Occupation</label>
                <select name="occupation" id="occupation-input" className="form-control">
                    <option value="student">Student (CAD 50)</option>
                    <option value="postdoc">Postdoc (CAD 100)</option>
                    <option value="faculty">Faculty/Professional (CAD 200)</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="affiliation-input">Affiliation/Organization</label>
                <input type="text" name="affiliation" id="affiliation-input" className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="dietary-input">Dietary Restrictions</label>
                <input type="text" name="dietary" id="dietary-input" className="form-control"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit Form</button>
        </form>
    );
}