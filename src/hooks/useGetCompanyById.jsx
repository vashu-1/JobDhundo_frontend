import React, { useEffect } from "react";
import axios from "axios";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
// import { setAllJobs } from "@/redux/jobSlice";
import { setSingleCompany } from "@/redux/companySlice";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          {
            withCredentials: true,
          }
        );
        // console.log(res.data.company);

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleCompany();
  }, [companyId, dispatch]);
  return <div></div>;
};

export default useGetCompanyById;
