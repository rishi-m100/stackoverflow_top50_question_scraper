import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  useEffect(() => {
    // Make an API request to run the scraper when the component mounts
    axios
      .post("http://localhost:3001/run-scraper")
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  }, []);

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getQuestions")
      .then((response) => {
        // Update to display only the last 50 unique elements based on title
        const uniqueQuestions = removeDuplicates(response.data, "title");
        const last50Questions = uniqueQuestions.slice(-50);
        setQuestions(last50Questions);
      })
      .catch((err) => console.log(err));
  }, []);

  // Helper function to remove duplicates based on a property
  const removeDuplicates = (arr, prop) => {
    const seen = {};
    return arr.filter((item) => {
      const value = item[prop];
      return seen.hasOwnProperty(value) ? false : (seen[value] = true);
    });
  };

  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
      <div className="w-75">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => (
                <tr key={question._id}>
                  <td>{question.title}</td>
                  <td>
                    <a
                      href={`https://${question.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {question.url}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
