import type { Job } from "../@types/job";
import { mockJobs } from "../data/mockJobs";

export async function fetchJobs(): Promise<Job[]> {
  // Simulate fetching jobs from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockJobs);
    }, 800);
  });
}
