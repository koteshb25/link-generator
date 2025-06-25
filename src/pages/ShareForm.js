// import React, { useState } from "react";
// import axios from "axios";
// import "./ShareBuilder.css";
// export default function ShareBuilder() {
//   const [data, setData] = useState({ name: "", message: "" });
//   const [url, setUrl] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await axios.post("/api/share/create", {
//       senderId: "sender123",
//       data
//     });
//     setUrl(res.data.url);
//   };

//   return (
//    <div className="share-container">
//       <h2 className="share-heading">🔗 Create Shareable Info</h2>
//       <form onSubmit={handleSubmit} className="share-form">
//         <input
//           type="text"
//           placeholder="Your Name"
//           value={data.name}
//           onChange={(e) => setData({ ...data, name: e.target.value })}
//           className="share-input"
//         />
//         <textarea
//           placeholder="Enter your message"
//           value={data.message}
//           onChange={(e) => setData({ ...data, message: e.target.value })}
//           className="share-textarea"
//         ></textarea>
//         <button type="submit" className="share-button">
//           ➕ Generate Link
//         </button>
//       </form>

//       {url && (
//         <div className="share-result">
//           <p>✅ Share this link:</p>
//           <a href={url} target="_blank" rel="noopener noreferrer" className="share-link">
//             {url}
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };
// src/SenderForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './ShareForm.css';

const ShareForm = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [selectedFields, setSelectedFields] = useState({});
  const [result, setResult] = useState(null);

  const handleCheckboxChange = (field) => {
    setSelectedFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {};
    for (const field in selectedFields) {
      if (selectedFields[field]) {
        dataToSend[field] = data[field];
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/api/share/create', {
        data: dataToSend
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error generating link:', error);
    }
  };

  return (
    <div className="sender-container">
      <h2>Share Your Details</h2>
      <form onSubmit={handleSubmit}>
        {['name', 'email', 'phone', 'message'].map((field) => (
          <div key={field} className="form-group">
            <input
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={data[field]}
              onChange={(e) => setData({ ...data, [field]: e.target.value })}
            />
            <label>
              <input
                type="checkbox"
                checked={selectedFields[field] || false}
                onChange={() => handleCheckboxChange(field)}
              />
              Share {field}
            </label>
          </div>
        ))}
        <button type="submit">Generate Link & PIN</button>
      </form>

      {result && (
        <div className="result-box">
          <p><strong>Share this link:</strong> <a href={result.url}>{result.url}</a></p>
          <p><strong>PIN:</strong> {result.pin}</p>
        </div>
      )}
    </div>
  );
};

export default ShareForm;
