import { getState } from "../state";

export function getSavedJobs() {
  const { jobs, savedJobs } = getState();

  return jobs.filter((job) => savedJobs.has(job.id));
}

export function getFilteredJobs() {
  const { jobs, search } = getState();

  if (!search.trim()) return jobs;

  const q = search.toLowerCase();

  return jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q),
  );
}

export function getAppliedJobs() {
  const { jobs, appliedJobs } = getState();

  return jobs.filter((job) => appliedJobs.has(job.id));
}
