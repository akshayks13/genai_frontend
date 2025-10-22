import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_API_PROMPT_URL;

const apiClient = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
});

export const generateRoadmap = async ({
  roadmapName,
  skills = [],
  currentExperience = '',
  targetDuration = ''
}) => {
  return apiClient.post("/roadmap", {
    roadmapName,
    skills,
    currentExperience,
    targetDuration
  });
};
