import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { isUserLoggedin } from "../utils/Login";

export function Portal() {
  let navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedin()) navigate("/");
  });

  return (
    <div className="portal-box">
      <div className="feedback-input">
        <label htmlFor="feedback">
          <textarea type="text" placeholder="Feedback" required></textarea>
        </label>
      </div>
    </div>
  );
}
