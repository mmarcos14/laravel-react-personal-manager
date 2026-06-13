import { useEffect, useState } from "react";
import { fetchAll } from "../Services/apiService";
import { DataTableSupport} from "./DataTableSupport";

export const SupportView=()=>{
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
                       <DataTableSupport DataSupport={spent} loading={loading} refresh={getSpent}/>
                    
                </div>
            </div>
           )
}