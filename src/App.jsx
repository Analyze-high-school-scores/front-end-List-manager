import React, { useState } from "react";
import Home from "./components/Home";
import CRUDMain from "./components/CRUD/CRUDMain";
import Create from "./components/CRUD/Create";
import Read from "./components/CRUD/Read";
import Update from "./components/CRUD/Update";
import Delete from "./components/CRUD/Delete";
import Clean from "./components/Clean";

function App() {
  const [view, setView] = useState("home");

  const renderView = () => {
    switch (view) {
      case "home":
        return (
          <Home
            navigateToCRUD={() => setView("crud")}
            navigateToClean={() => setView("clean")}
          />
        );
      case "crud":
        return (
          <CRUDMain
            navigateToCreate={() => setView("create")}
            navigateToRead={() => setView("read")}
            navigateToUpdate={() => setView("update")}
            navigateToDelete={() => setView("delete")}
            navigateBack={() => setView("home")}
          />
        );
      case "create":
        return (
          <Create
            navigateBack={() => setView("crud")}
            navigateHome={() => setView("home")}
          />
        );
      case "read":
        return (
          <Read
            navigateBack={() => setView("crud")}
            navigateHome={() => setView("home")}
          />
        );
      case "update":
        return (
          <Update
            navigateBack={() => setView("crud")}
            navigateHome={() => setView("home")}
          />
        );
      case "delete":
        return (
          <Delete
            navigateBack={() => setView("crud")}
            navigateHome={() => setView("home")}
          />
        );
      case "clean":
        return <Clean navigateBack={() => setView("home")} />;
      default:
        return <Home navigateToCRUD={() => setView("crud")} />;
    }
  };

  return <div>{renderView()}</div>;
}

export default App;
