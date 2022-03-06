import React, { useState, useRef } from "react";
import "./App.scss";
import { validateForm } from "./ValidationForm";

export default function App() {
  const [dishName, setDishName] = useState("");
  const [preparationTime, setPreparationTime] = useState("00:00:00");
  const [dishType, setDishType] = useState("");
  const [noOfSlices, setNoOfSlices] = useState(0);
  const [pizzaDiameter, setPizzaDiameter] = useState(0);
  const [spicinessScale, setSpicinessScale] = useState(1);
  const [slicesOfBread, setSlicesOfBread] = useState(0);
  const [result, setResult] = useState("");
  const refResultHeader = useRef(null);
  const refResultContainer = useRef(null);
  const refLabelSlices = useRef(null);
  const refLabelDiameter = useRef(null);
  const refLabelSpiciness = useRef(null);
  const refLabelBread = useRef(null);

  const sendDish = async (dish) => {
    console.log(JSON.stringify(dish));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dish),
    };
    try {
      await fetch(
        "https://frosty-wood-6558.getsandbox.com:443/dishes",
        requestOptions
      );
      changeResult(true, "Dish has been added.");
    } catch (err) {
      changeResult(false, "Connection problem.");
    }
  };

  const changeResult = (isCorrectResult, resultText) => {
    if (isCorrectResult === false) {
      refResultHeader.current.style.color = "crimson";
      setResult(resultText);
    } else if (isCorrectResult === true) {
      refResultHeader.current.style.color = "limegreen";
      setResult(resultText);
    }
  };

  const sumbitForm = (e) => {
    e.preventDefault();
    const dish = {
      name: dishName,
      preparation_time: preparationTime,
      type: dishType,
      ...(dishType === "pizza" && { diameter: Number(pizzaDiameter) }),
      ...(dishType === "pizza" && { no_of_slices: Number(noOfSlices) }),
      ...(dishType === "soup" && { spiciness_scale: Number(spicinessScale) }),
      ...(dishType === "sandwich" && { slices_of_bread: Number(slicesOfBread),
      }),
    };
    const [isValidated, error] = validateForm(dish);
    refResultContainer.current.style.display = "block";
    if (isValidated) {
      sendDish(dish);
    } else {
      changeResult(false, error);
    }
  };

  const showAdditionalOptions = (type) => {
    const refs = [
      refLabelSlices,
      refLabelDiameter,
      refLabelSpiciness,
      refLabelBread,
    ];
    const optionsCurrType = refs.filter((el) =>
      [...el.current.classList].includes(`option-${type}`)
    );
    const otherOptions = refs.filter((el) => !optionsCurrType.includes(el));
    //show appropriate (for the current type) options
    optionsCurrType.forEach((el) => (el.current.style.display = "flex"));
    //hide other options
    otherOptions.forEach((el) => (el.current.style.display = "none"));
  };

  return (
    <div>
      <form className="form-container">
        <h1 className="main-header">Create your dish</h1>
        <label htmlFor="dish-name" className="dish-name">
          <h5>Name:</h5>
          <input
            type="text"
            id="dish-name"
            name="dish-name"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
          />
        </label>
        <label htmlFor="preparation-time" className="preparation-time">
          <h5>Preparation time:</h5>
          <input
            type="time"
            defaultValue={preparationTime}
            step="1"
            id="preparation-time"
            name="preparation-time"
            onChange={(e) => setPreparationTime(e.target.value)}
          />
        </label>
        <label htmlFor="dish-type" className="dish-type">
          <h5>Type:</h5>
          <select
            id="dish-type"
            onChange={(e) => {
              setDishType(e.target.options[e.target.selectedIndex].value);
              showAdditionalOptions(
                e.target.options[e.target.selectedIndex].value
              );
            }}
          >
            <option value="">-</option>
            <option value="pizza">pizza</option>
            <option value="soup">soup</option>
            <option value="sandwich">sandwich</option>
          </select>
        </label>
        <label
          htmlFor="no-of-slices"
          className="add-option option-pizza"
          ref={refLabelSlices}
        >
          <h5>Number of slices:</h5>
          <input
            type="number"
            defaultValue="0"
            min="0"
            id="no-of-slices"
            name="no-of-slices"
            onChange={(e) => setNoOfSlices(e.target.value)}
          />
        </label>
        <label
          htmlFor="diameter"
          className="add-option option-pizza"
          ref={refLabelDiameter}
        >
          <h5>Diameter:</h5>
          <input
            type="number"
            defaultValue="0.00"
            min="0.00"
            step="0.01"
            id="diameter"
            name="diameter"
            onChange={(e) => setPizzaDiameter(e.target.value)}
          />
        </label>
        <label
          htmlFor="spiciness-scale"
          className="add-option option-soup"
          ref={refLabelSpiciness}
        >
          <h5>Spiciness scale ({spicinessScale}):</h5>
          <input
            type="range"
            defaultValue="1"
            min="1"
            max="10"
            id="spiciness-scale"
            name="spiciness-scale"
            onChange={(e) => setSpicinessScale(e.target.value)}
          />
        </label>
        <label
          htmlFor="slices-of-bread"
          className="add-option option-sandwich"
          ref={refLabelBread}
        >
          <h5>Slices of bread:</h5>
          <input
            type="number"
            defaultValue="0"
            min="0"
            id="slices-of-bread"
            name="slices-of-bread"
            onChange={(e) => setSlicesOfBread(e.target.value)}
          />
        </label>
        <div className="result-container" ref={refResultContainer}>
          <h2 className="result-message" ref={refResultHeader}>
            {result}
          </h2>
        </div>
        <div className="submit-container">
          <input
            type="submit"
            value="Send"
            className="submit"
            onClick={sumbitForm}
          />
        </div>
      </form>
    </div>
  );
}
