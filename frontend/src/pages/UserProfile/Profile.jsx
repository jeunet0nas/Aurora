import React, { useEffect } from "react";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import UpdateUserInfos from "../../components/UpdateUserInfos/UpdateUserInfos";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/authenticate");
  }, [isLoggedIn]);

  return (
    <div className="user-profile-container">
      <div className="user-profile row my-5">
        <ProfileSidebar />
        <UpdateUserInfos profile={true} />
      </div>
    </div>
  );
}
