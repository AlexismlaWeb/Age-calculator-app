import "./App.css";
import { useState } from "react";
import AnimatedNumbers from "react-animated-numbers";

import iconArrow from "../src/icon-arrow.svg";

function App() {
  const [BirthDate, setBirthDate] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [ageDetails, setAgeDetails] = useState({ age: "", mois: "", day: "" });

  const [errorMess, setErrorMess] = useState({
    day: "",
    month: "",
    year: "",
    all: "",
  });

  const FormBirthDate = () => {
    const dateActual = new Date();
    if (BirthDate.year && BirthDate.month && BirthDate.day) {
      if (Number(BirthDate.year) > dateActual.getFullYear) {
        setErrorMess({ ...errorMess, year: "Must be in past" });
      } else if (Number(BirthDate.month) > 12) {
        setErrorMess({ ...errorMess, month: "Must be a valid month" });
      } else if (Number(BirthDate.day) > 31) {
        setErrorMess({ ...errorMess, day: "Must be a valid day" });
      }

      let birthDate_string = BirthDate.year
        ? `${BirthDate.year}-${BirthDate.month}-${BirthDate.day}`
        : null;
      let birthDate = new Date(birthDate_string);
      let diff = Number(dateActual) - Number(birthDate);

      if (diff > 0) {
        var age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        var mois = Math.floor(
          (diff % (1000 * 60 * 60 * 24 * 365.25)) /
            (1000 * 60 * 60 * 24 * 30.436875)
        );
        var jours = Math.floor(
          (diff % (1000 * 60 * 60 * 24 * 30.436875)) / (1000 * 60 * 60 * 24)
        );

        setAgeDetails({
          ...ageDetails,
          age: age,
          mois: mois,
          day: jours,
        });
        setErrorMess({ day: "", month: "", year: "", all: "" });
      }
    }

    // else {
    //   setErrorMess({ ...errorMess, all: "Must be a valid date" });
    // }
  };

  console.log(errorMess.all);
  const config = [
    { mass: 1, tension: 30, friction: 10 },
    { mass: 2, tension: 40, friction: 10 },
    { mass: 3, tension: 30, friction: 10 },
  ];

  return (
    <div className="main_container">
      <div className="calculator_container">
        <div className="birthdate_container">
          <div
            className={
              errorMess.day || errorMess.all ? "error_input" : "input_birthdate"
            }
          >
            <span>DAY</span>
            <input
              placeholder="DD"
              name="day"
              value={BirthDate.day}
              onChange={(result) => {
                setBirthDate({ ...BirthDate, day: result.target.value });
              }}
            />
            {errorMess.day || errorMess.all ? (
              <span
                style={{
                  color: "hsl(0, 100%, 67%)",
                  fontSize: "0.7vw",
                  textAlign: "center",
                  marginBlockStart: "2px",
                }}
              >
                {errorMess.day || errorMess.all}
              </span>
            ) : null}
          </div>
          <div
            className={
              errorMess.month || errorMess.all
                ? "error_input"
                : "input_birthdate"
            }
          >
            <span>MONTH</span>
            <input
              placeholder="MM"
              value={BirthDate.month}
              onChange={(result) => {
                setBirthDate({ ...BirthDate, month: result.target.value });
              }}
            />
            {errorMess.month ? (
              <span
                style={{
                  color: "hsl(0, 100%, 67%)",
                  fontSize: "0.7vw",
                  textAlign: "center",
                }}
              >
                {errorMess.month}
              </span>
            ) : null}
          </div>
          <div
            className={
              errorMess.year || errorMess.all
                ? "error_input"
                : "input_birthdate"
            }
          >
            <span>YEAR</span>
            <input
              placeholder="YYYY"
              value={BirthDate.year}
              onChange={(result) => {
                setBirthDate({ ...BirthDate, year: result.target.value });
              }}
            />
            {errorMess.year ? (
              <span
                style={{
                  color: "hsl(0, 100%, 67%)",
                  fontSize: "0.7vw",
                  textAlign: "center",
                }}
              >
                {errorMess.year}
              </span>
            ) : null}
          </div>
          <img
            src={iconArrow}
            alt="icon"
            className="img"
            onClick={FormBirthDate}
          />
        </div>
        <div className="result_container">
          <div className="result">
            <div className="ok">
              {ageDetails.age ? (
                <AnimatedNumbers
                  animateToNumber={ageDetails.age}
                  configs={config}
                />
              ) : (
                "- -"
              )}
            </div>
            <h1>years</h1>
          </div>
          <div className="result">
            <div className="ok">
              {ageDetails.mois ? (
                <AnimatedNumbers
                  animateToNumber={ageDetails.mois}
                  configs={config}
                />
              ) : (
                "- -"
              )}
            </div>
            <h1>months</h1>
          </div>
          <div className="result">
            <div className="ok">
              {ageDetails.day ? (
                <AnimatedNumbers
                  animateToNumber={ageDetails.day}
                  configs={config}
                />
              ) : (
                "- -"
              )}
            </div>
            <h1>days</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
