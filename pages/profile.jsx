import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState("");
  const [applications, setApplications] = useState([]);
  const [userId, setUserId] = useState("");

  const seller_token = localStorage.getItem("seller_token");

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/v1/seller/profile",
        {
          headers: { Authorization: `bearer ${seller_token}` },
        }
      );
      console.log(response.data.user);
      setProfile(response.data.user);
    };

    fetchProfile();
  }, []);

  const fetchApplication = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/product/receive-request",
        {
          headers: {
            Authorization: `bearer ${seller_token}`,
          },
        }
      );
      console.log(response.data.applications);
      setApplications(response.data.applications);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);
  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <div className="profile" style={{ border: "1px solid black" }}>
        <h2>Profile</h2>
        <h3>{profile.name}</h3>
        <p>{profile.email}</p>
      </div>
      <div className="applications" style={{ border: "1px solid black" }}>
        <h2>Applications</h2>
        {applications.map((application) =>
          application.receiver === profile._id ? (
            <div
              style={{
                border: "1px solid black",
                margin: "2rem",
                padding: "1rem",
              }}
            >
              <h2>{application.sender.name} has bought this product</h2>
              <div>
                <h3>{application.productDetail.title}</h3>
                <img
                  src={application.productDetail.image.url}
                  alt="product"
                  height={"100px"}
                  width={"100px"}
                />
              </div>
              <button>Approve</button>
            </div>
          ) : (
            <div>
              <p>No applications</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Profile;
