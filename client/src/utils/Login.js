import { jwtDecode } from "jwt-decode";

// const BASEURL = "http://localhost:8080/api";
const BASEURL = window.location.origin + "/api";

export async function loginUser(email, password) {
  let res = await fetch(`${BASEURL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  let data = await res.json();

  if (data.status == true) {
    localStorage.setItem("token", data.token);
    return { message: data.message, status: true };
  } else {
    return { message: data.message, status: false };
  }
}

export async function createUser(name, email, password) {
  let res = await fetch(`${BASEURL}/user/createUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  let data = await res.json();

  if (data.status == true) {
    return { message: data.message, status: true };
  } else {
    return { message: data.message, status: false };
  }
}

export function isUserLoggedin() {
  const token = localStorage.getItem("token");

  let decodedToken;

  try {
    decodedToken = jwtDecode(token);
    return true;
  } catch (error) {
    localStorage.removeItem("token");
    return false;
  }
}
