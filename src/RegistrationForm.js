import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Bootstrap icons

const RegistrationForm = () => {
  // State to store form values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // State to store validation errors
  const [errors, setErrors] = useState({});

  // State to track password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Handle input change for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Toggle password visibility
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Validate fields and handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Local object to hold validation results
    let fieldErrors = {};

    // --- Name validation ---
    fieldErrors.name = formData.name.trim() === "" ? "Name is required" : "";

    // --- Email validation ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    fieldErrors.email =
      formData.email.trim() === ""
        ? "Email is required"
        : !emailRegex.test(formData.email)
        ? "Invalid email format"
        : "";

    // --- Password validation ---
    fieldErrors.password =
      formData.password.trim() === ""
        ? "Password is required"
        : formData.password.length < 6
        ? "Password must be at least 6 characters"
        : "";

    // Update errors state so error messages appear
    setErrors(fieldErrors);

    // Check if there are no errors
    const noErrors = Object.values(fieldErrors).every((err) => err === "");

    if (noErrors) {
      // Show alert with formatted JSON
      alert(JSON.stringify(formData, null, 2));

      // Reset form
      setFormData({ name: "", email: "", password: "" });
      setErrors({});
    } else {
      alert("Please fix the errors before submitting!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-5 shadow-sm mx-auto" style={{ maxWidth: "450px" }}>
        <h3 className="text-center mb-4 text-primary">User Registration</h3>

        <form onSubmit={handleSubmit} noValidate>
          {/* --- Name Field --- */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-person"></i>
              </span>
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
          </div>

          {/* --- Email Field --- */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
          </div>

          {/* --- Password Field with Show/Hide Toggle --- */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePassword}
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </button>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
          </div>

          {/* --- Submit Button --- */}
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
