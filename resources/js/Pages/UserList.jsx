import { useEffect, useState } from "react";
import { DataTableUser } from "./DataTableUser";
import { fetchAll } from "../Services/apiService";

export const UserList = () => {
    // état local pour stocker la liste des utilisateurs
    const [users, setUser] = useState([]);

    // fonction pour récupérer tous les users depuis l’API
    const getUsers = async () => {
        try {
            const response = await fetchAll("user");

            // récupération des données users depuis la réponse API
            setUser(response.data.usery || []);

        } catch (error) {
            console.error("ERROR:", error);
        }
    };

    // appel API au chargement du composant
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="container mt-5">

            <div className="row col-12">

                <div className="justify-content-center">

                    {/* affichage tableau users */}
                    <DataTableUser DataUser={users} />

                </div>

            </div>

        </div>
    );
};