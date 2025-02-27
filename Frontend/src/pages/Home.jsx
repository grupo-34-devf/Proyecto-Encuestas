import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t, i18n } = useTranslation();

  const handleLngChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <h1>{t("app.name")}</h1>
      <NavLink to="/login">Login</NavLink>
      <br />
      <NavLink to="/register">Register</NavLink>
      <br />
      <NavLink to="/profile">Profile</NavLink>
      <button
        onClick={() => {
          handleLngChange("es");
        }}
      >
        Cambiar idioma
      </button>
      <button
        onClick={() => {
          handleLngChange("en");
        }}
      >
        Change language
      </button>
    </div>
  );
};

export default Home;
