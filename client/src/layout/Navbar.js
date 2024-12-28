import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: theme === "light" ? "#007bff" : "#343a40" }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand text-white"
          to="/"
          style={{ color: theme === "light" ? "#ffffff" : "#f8f9fa" }}
        >
          JobSearcher
        </Link>
        <div className="d-flex justify-content-between w-100">
          <form className="d-flex" role="search">
            <Link className="btn btn-success mx-2" to="/">
              {language === "cz" ? "Domů" : "Home"}
            </Link>
            <Link className="btn btn-success mx-2" to="/addtechjob">
              {language === "cz" ? "Přidat Práci" : "AddTechJob"}
            </Link>
          </form>
          <form className="d-flex" role="search">
            <Link className="btn btn-info mx-2" to="/joblistadmin">
              {language === "cz" ? "Admin Seznam" : "JobListAdmin"}
            </Link>
            <Link className="btn btn-info mx-2" to="/joblist">
              {language === "cz" ? "Seznam Prací" : "Joblist"}
            </Link>
            <Link className="btn btn-info mx-2" to="/applicant-list">
              {language === "cz" ? "Žadatelé" : "ApplicantList"}
            </Link>
          </form>
          <div className="d-flex align-items-center">
            {/* Language Selector */}
            <select
              className="form-select me-3"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{ width: "120px" }}
            >
              <option value="en">English</option>
              <option value="cz">Čeština</option>
            </select>

            {/* Theme Toggle Button */}
            <button
              className="btn"
              onClick={toggleTheme}
              style={{
                backgroundColor: theme === "light" ? "#f8f9fa" : "#343a40",
                color: theme === "light" ? "#000000" : "#ffffff",
                border: "none",
              }}
            >
              {language === "cz"
                ? theme === "light"
                  ? "Tmavý"
                  : "Světlý"
                : theme === "light"
                ? "Dark"
                : "Light"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
