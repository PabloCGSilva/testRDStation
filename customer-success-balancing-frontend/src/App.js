import React, { useState } from "react";
import axios from "axios";

function App() {
  const [csScores, setCsScores] = useState("");
  const [customerScores, setCustomerScores] = useState("");
  const [unavailableCSIds, setUnavailableCSIds] = useState("");
  const [result, setResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleBalanceClick = () => {
    setErrorMessage(""); // Clear any previous error message

    // Perform input validation
    if (!isValidScore(csScores) || !isValidScore(customerScores)) {
      setErrorMessage("Scores must be integers from 1 to 5");
      return;
    }

    axios
      .post("/balance", { csScores, customerScores, unavailableCSIds })
      .then((response) => {
        setResult(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status !== 200) {
          setErrorMessage(
            "Error: Failed to retrieve balance. Please try again."
          );
        } else {
          setErrorMessage(
            "An unexpected error occurred. Please try again later."
          );
        }
      });
  };

  const isValidScore = (score) => {
    const parsedScore = parseInt(score, 10);
    return !isNaN(parsedScore) && parsedScore >= 1 && parsedScore <= 5;
  };

  return (
    <div>
      <h1>Customer Success Balancing</h1>
      <div>
        <label>CS Scores:</label>
        <input
          type="text"
          value={csScores}
          onChange={(e) => setCsScores(e.target.value)}
        />
      </div>
      <div>
        <label>Customer Scores:</label>
        <input
          type="text"
          value={customerScores}
          onChange={(e) => setCustomerScores(e.target.value)}
        />
      </div>
      <div>
        <label>Unavailable CS Ids:</label>
        <input
          type="text"
          value={unavailableCSIds}
          onChange={(e) => setUnavailableCSIds(e.target.value)}
        />
      </div>
      <button onClick={handleBalanceClick}>Balance</button>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      {result && <div>Result: {result}</div>}
    </div>
  );
}

export default App;
