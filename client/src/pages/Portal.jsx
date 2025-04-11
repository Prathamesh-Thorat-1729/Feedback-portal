import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { isUserLoggedin } from "../utils/Login";
import "../css/Portal.css";
import { HiMiniBolt } from "react-icons/hi2";
import io from "socket.io-client";

const socket = io(window.location.origin); // connect to backend

export function Portal() {
  let navigate = useNavigate();

  useEffect(() => {
    console.log(socket.id);

    socket.on("load_messages", (a) => console.log(a))

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isUserLoggedin()) navigate("/");
  });

  return (
    <div className="portal-box">
      <div className="feedback-input">
        <label htmlFor="feedback">
          <input
            className="feedback-submit"
            type="text"
            placeholder="Feedback"
            required
          />
          <HiMiniBolt />
        </label>
        <input type="submit" value={"Submit"} />
      </div>
    </div>
  );
}
