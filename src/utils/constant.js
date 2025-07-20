const BASE_URL = import.meta.env.PROD
  ? "https://vercel.com/vijays-projects-2b8b3162/job-dhundo-backend/snEPzJREDMaU7fhGDwuoXa8i6Rqk"
  : "http://localhost:8000";

export const USER_API_END_POINT = `${BASE_URL}/api/v1/user`;
export const JOB_API_END_POINT = `${BASE_URL}/api/v1/job`;
export const APPLICATION_API_END_POINT =
  `${BASE_URL}/api/v1/application`;
export const COMPANY_API_END_POINT = `${BASE_URL}/api/v1/company`;
