import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditTemuan = () => {
  const [title, setTitle] = useState("");
  const [identity, setIdentity] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getTemuanById();
  }, []);

  const getTemuanById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/temuan/${id}`);
      const temuan = response.data;
      setTitle(temuan.name);
      setIdentity(temuan.identity || "");
      setDesc(temuan.desc || "");
      setLocation(temuan.location || "");
      setDate(temuan.date || "");
      setFile(temuan.image);
      setPreview(temuan.url);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const updateTemuan = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("identity", identity);
    formData.append("desc", desc);
    formData.append("location", location);
    formData.append("date", date);
    try {
      await axios.patch(`http://localhost:5000/temuan/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={updateTemuan}>
          <div className="field">
            <label className="label">Nama Temuan</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nama barang / kendaraan temuan"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Identitas Pemilik</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                placeholder="Identitas pemilik (jika ada)"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Deskripsi</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Deskripsi temuan"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Lokasi Temuan</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Lokasi temuan"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Tanggal Temuan</label>
            <div className="control">
              <input
                type="date"
                className="input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Tanggal temuan"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Image</label>
            <div className="control">
              <div className="file">
                <label className="file-label">
                  <input
                    type="file"
                    className="file-input"
                    onChange={loadImage}
                  />
                  <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {preview ? (
            <figure className="image is-128x128">
              <img src={preview} alt="Preview Image" />
            </figure>
          ) : (
            ""
          )}

          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTemuan;
