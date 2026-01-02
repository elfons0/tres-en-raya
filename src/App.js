import logo from "./images/tic-tac-toe.png";
import "./App.css";
import Board from "./components/Board";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  //i18n.changeLanguage(navigator.language);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-title">{t("title")}</p>
      </header>
      <Board />
    </div>
  );
}

export default App;
