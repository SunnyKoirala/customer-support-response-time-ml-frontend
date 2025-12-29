import React, { useState } from "react";
import "./Predictor.css";

const API_BASE_URL = "https://customer-support-response-time-ml-backend.onrender.com";

// replace with your actual backend URL

function Predictor() {
  const [formData, setFormData] = useState({
    DailyVolume: "",
    HourOfDay: "",
    DayOfWeek: "",
    Priority: "",
    Category: ""
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Prediction error:", error);
      setPrediction("Error predicting response time");
    }

    setLoading(false);
  };

  return (
    <div className="predictor-page">
      <div className="predictor-card">
        <span className="ai-badge">AI Powered</span>

        <h2>Response Time Predictor</h2>
        <p className="subtitle">
          Estimate customer support response time using Machine Learning
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="DailyVolume"
            placeholder="Daily Ticket Volume"
            value={formData.DailyVolume}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="HourOfDay"
            placeholder="Hour of Day (0-23)"
            value={formData.HourOfDay}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="DayOfWeek"
            placeholder="Day of Week (0-6)"
            value={formData.DayOfWeek}
            onChange={handleChange}
            required
          />

          <select
            name="Priority"
            value={formData.Priority}
            onChange={handleChange}
            required
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            name="Category"
            value={formData.Category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Billing">Billing</option>
            <option value="Technical">Technical</option>
            <option value="General">General</option>
          </select>

          <button type="submit">Predict Response Time</button>
        </form>

        {loading && <div className="ai-thinking">AI is thinking...</div>}

        {prediction && (
          <div className="prediction">
            Estimated Response Time: <strong>{prediction} hours</strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default Predictor;
