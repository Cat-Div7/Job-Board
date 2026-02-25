import type { Job } from "../@types/job";
import { mockJobs } from "../data/mockJobs";

export async function fetchJobs(): Promise<Job[]> {
  // Simulate fetching jobs from an API
  await new Promise((r) => setTimeout(r, 1200));

  // simulate error sometimes
  if (Math.random() < 0.2) {
    throw new Error("Failed to load jobs");
  }

  return mockJobs;
}
