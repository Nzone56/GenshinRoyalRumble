import { redirect } from "react-router";

export const restrictAccess = () => {
  const tournament = localStorage.getItem("Tournament");
  if (!tournament) {
    return redirect("/");
  }
  return null;
};