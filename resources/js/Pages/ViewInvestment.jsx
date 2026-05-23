import { useEffect, useState } from "react";
import { fetchAll } from "../Services/apiService";
import { InvestmentTable } from "./InvestmentTable";

export const ViewInvestment=()=>{
     const [loading, setLoading] = useState(true);
    const [spent,setSpent]=useState([]);


       const getSpent = async () => {
           try {
               const response = await fetchAll("spent");
               setSpent(response.data.spentss || []);
           } catch (e) {
               console.log(e);
           } finally {
               setLoading(false);
           }
       }; 


        useEffect(() => {
               getSpent();
           }, []);

           return(
            <div className="container">
                <div className="row">
                    <InvestmentTable DataInvestment={spent} loading={loading} refresh={getSpent}/>
                </div>
            </div>
           )
}