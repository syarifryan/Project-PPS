import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TemuanList = () => {
  const [temuan, setTemuan] = useState([]);

  useEffect(() => {
    getTemuan();
  }, []);

  const getTemuan = async () => {
    const response = await axios.get("http://localhost:5000/temuan");
    setTemuan(response.data);
  };

  const deleteTemuan = async (temuanId) => {
    try {
      await axios.delete(`http://localhost:5000/temuan/${temuanId}`);
      getTemuan();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <Link to="/add" className="button is-success">
        Add New
      </Link>
      <div className="columns is-multiline mt-2">
        {temuan.map((temuan) => (
          <div className="column is-one-quarter" key={temuan.id}>
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={temuan.url} alt="Image" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{temuan.name}</p>
                  </div>
                </div>
              </div>

              <footer className="card-footer">
                <Link to={`edit/${temuan.id}`} className="card-footer-item">
                  Edit
                </Link>
                <a
                  onClick={() => deleteTemuan(temuan.id)}
                  className="card-footer-item"
                >
                  Delete
                </a>
              </footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemuanList;
