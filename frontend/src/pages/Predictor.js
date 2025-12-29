import React, { useState } from "react";

const API_BASE_URL = "https://customer-support-response-time-ml.onrender.com";

function Predictor() {
  const [formData, setFormData] = useState({
    DailyVolume: "",
    HourOfDay: "",
    DayOfWeek: "",
    Priority: "",
    Category: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setPrediction(data.prediction);
  };

  return (
    <div>
      <h2>Response Time Predictor</h2>

      <form onSubmit={handleSubmit}>
        <input name="DailyVolume" onChange={handleChange} />
        <input name="HourOfDay" onChange={handleChange} />
        <input name="DayOfWeek" onChange={handleChange} />
        <input name="Priority" onChange={handleChange} />
        <input name="Category" onChange={handleChange} />
        <button type="submit">Predict</button>
      </form>

      {prediction !== null && (
        <p>Predicted Response Time: {prediction} hours</p>
      )}
    </div>
  );
}

export default Predictor;
