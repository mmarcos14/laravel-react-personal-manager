import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProviderContext } from "./ServiceContext/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Nav } from "./Pages/Nav";
import { RoutesProtected } from "./Pages/RoutesProtected";
import { Dashboad } from "./Pages/Dashboad";
import { ModalSpent } from "./Pages/ModalSpent";
import { ListSpent } from "./Pages/ListSpent";
import { ListNotes } from "./Pages/ListNotes";
import { UserList } from "./Pages/UserList";
import { Home } from "./Pages/Home";
import { ResetPassword } from "./Pages/ResetPassword";
import { FilterTransaction } from "./Pages/FilterTransaction";
import { Contact } from "./Pages/Contact";
import { ContactList } from "./Pages/ContactList";
import { Profile } from "./Pages/Profile";
import { Ambroise } from "./Pages/Ambroise";


function App() {
    return (
        <ProviderContext>
            <BrowserRouter>
                <Nav />

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/resset_password" element={<ResetPassword/>} />
                    <Route path="/contact" element={<Contact/>} />
                    <Route path="/message" element={<ContactList/>} />



                    <Route path="/" element={<Home/>} />

                     <Route element={<RoutesProtected />}>
                        <Route path="/filter" element={<FilterTransaction/>} />
                    </Route>

                     <Route element={<RoutesProtected />}>
                        <Route path="/profile" element={<Profile/>} />
                    </Route>
                    <Route element={<RoutesProtected />}>
                        <Route path="/dashboad" element={<Dashboad />} />
                    </Route>
                    
                    

                    <Route element={<RoutesProtected />}>
                        <Route path="/spent" element={<ListSpent />} />
                    </Route>

                    
                    <Route element={<RoutesProtected />}>
                        <Route path="/all" element={<Ambroise/>} />
                    </Route>



                      <Route element={<RoutesProtected />}>
                        <Route path="/note" element={<ListNotes/>} />
                    </Route>
                     <Route element={<RoutesProtected />}>
                        <Route path="/user" element={<UserList/>} />
                    </Route>
                </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
 

            </BrowserRouter>
        </ProviderContext>
    );
}

const root = document.getElementById("app");

if (root) {
    ReactDOM.render(<App />, root);
}
