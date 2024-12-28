import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const TechJobFilter = ({ onFilterChange }) => {
  const { theme } = useTheme(); // Access the theme context
  const { language } = useLanguage(); // Access the language context

  const translations = {
    en: {
      namePlaceholder: "Name",
      cityPlaceholder: "Select City",
      seniorityPlaceholder: "Seniority",
      currencyPlaceholder: "Currency",
      filterButton: "Filter",
      cities: {
        PRAGUE: "Prague",
        PLZEN: "Plzen",
        CHEB: "Cheb",
        PARDUBICE: "Pardubice",
      },
    },
    cz: {
      namePlaceholder: "Jméno",
      cityPlaceholder: "Vyberte Město",
      seniorityPlaceholder: "Úroveň",
      currencyPlaceholder: "Měna",
      filterButton: "Filtrovat",
      cities: {
        PRAGUE: "Praha",
        PLZEN: "Plzeň",
        CHEB: "Cheb",
        PARDUBICE: "Pardubice",
      },
    },
  };

  const [filters, setFilters] = useState({
    name: "",
    baitText: "",
    description: "",
    seniority: "",
    city: "",
    currency: "",
    sortBy: "id",
  });

  const t = translations[language]; // Select translations based on language

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-3"
      style={{
        backgroundColor: theme === "light" ? "#f9f9f9" : "#1e1e1e",
        color: theme === "light" ? "#000000" : "#ffffff",
        padding: "15px",
        borderRadius: "5px",
      }}
    >
      <div className="row">
        <input
          type="text"
          name="name"
          placeholder={t.namePlaceholder}
          className="form-control col mx-2"
          onChange={handleInputChange}
          style={{
            backgroundColor: theme === "light" ? "#ffffff" : "#333333",
            color: theme === "light" ? "#000000" : "#ffffff",
          }}
        />
        <select
          name="city"
          className="form-control col mx-2"
          onChange={handleInputChange}
          style={{
            backgroundColor: theme === "light" ? "#ffffff" : "#333333",
            color: theme === "light" ? "#000000" : "#ffffff",
          }}
        >
          <option value="">{t.cityPlaceholder}</option>
          <option value="PRAGUE">{t.cities.PRAGUE}</option>
          <option value="PLZEN">{t.cities.PLZEN}</option>
          <option value="CHEB">{t.cities.CHEB}</option>
          <option value="PARDUBICE">{t.cities.PARDUBICE}</option>
        </select>
        <input
          type="text"
          name="seniority"
          placeholder={t.seniorityPlaceholder}
          className="form-control col mx-2"
          onChange={handleInputChange}
          style={{
            backgroundColor: theme === "light" ? "#ffffff" : "#333333",
            color: theme === "light" ? "#000000" : "#ffffff",
          }}
        />
        <input
          type="text"
          name="currency"
          placeholder={t.currencyPlaceholder}
          className="form-control col mx-2"
          onChange={handleInputChange}
          style={{
            backgroundColor: theme === "light" ? "#ffffff" : "#333333",
            color: theme === "light" ? "#000000" : "#ffffff",
          }}
        />
        <button type="submit" className="btn btn-primary col-auto mx-2">
          {t.filterButton}
        </button>
      </div>
    </form>
  );
};

export default TechJobFilter;
