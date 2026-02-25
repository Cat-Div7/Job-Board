import { getState } from "../state";

export function getSavedJobs() {
  const { jobs, savedJobs } = getState();

  return jobs.filter((job) =>
    savedJobs.has(job.id)
  );
}