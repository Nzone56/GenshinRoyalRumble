import { useState } from "react";
import type { TornamentConfig } from "../store/useConfigStore";
import "../assets/styles/tailwind.css";

export const LandingPage = () => {
  const [formConfig, setFormConfig] = useState<TornamentConfig>({
    name: "",
    type: "League",
    characters: [],
    categories: [],
  });

  console.log(formConfig);
  return (
    <div className="flex flex-col items-center h-screen w-screen pt-20">
      <h1 className="text-6xl">GENSHIN ROYAL RUMBLE </h1>
      <div className="flex flex-col items-center justify-center w-1/2 h-1/2 rounded-lg p-4 gap-4">
        <label className="form-label">Tournament Name</label>
        <input
          id="tournament_name"
          className="form-input"
          value={formConfig.name}
          placeholder="Name"
          onChange={(e) => setFormConfig((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
        <label>Tournament Type</label>
        <select
          id="tournament_type"
          className="form-select"
          value={formConfig.type}
          onChange={(e) => setFormConfig((prev) => ({ ...prev, type: e.target.value as TornamentConfig["type"] }))}
        >
          <option value="League">League</option>
          <option value="RoundRobin">Round Robin</option>
          <option value="Elimination">Elimination</option>
          <option value="GroupsElimination">Groups Elimination</option>
          <option value="Sides">Sides</option>
        </select>
        <label>Characters</label>
        <label>Categories</label>
      </div>
    </div>
  );
};
