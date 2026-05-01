import { useEffect, useState } from "react";
import { DataTableSpent } from "./DataTableSpent";
import { fetchAll } from "../Services/apiService";

export const ListSpent = () => {
  const [spents, setSpents] = useState([]);

  const getSpents = async () => {
    try {
      const response = await fetchAll("spent");

      console.log("Response:", response);

      // ✅ FIX IMPORTANT : gérer plusieurs formats backend
      setSpents(
        response?.data?.spentss ||
        response?.data ||
        response?.spents ||
        []
      );
    } catch (error) {
      console.error("Error fetching spents:", error);
      setSpents([]);
    }
  };

  useEffect(() => {
    getSpents();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <DataTableSpent
          DataSpent={spents}
          listfresho={getSpents}
        />
      </div>
    </div>
  );
};