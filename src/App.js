import "./App.scss";
import { useState, useEffect, useRef } from "react";

const strengths = ["Weak", "Medium", "Strong", "Very Strong"];

const App = () => {
  const [password, setPassword] = useState();
  const [length, setLength] = useState(10);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [strength, setStrength] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const rangeInput = useRef(null);

  function handleInputChange() {
    const min = rangeInput.current.min;
    const max = rangeInput.current.max;
    const val = rangeInput.current.value;

    rangeInput.current.style.backgroundSize =
      ((val - min) * 100) / (max - min) + "% 100%";

    setLength(val);
  }

  console.log(rangeInput);

  useEffect(() => {
    if (rangeInput) {
      handleInputChange();
    }
  }, [rangeInput]);

  return (
    <div className="app">
      <div className="app__container">
        <h1 className="app__title">Password Generator</h1>
        <div className="app__password">
          {password && <span>{password}</span>}
          {!password && <span className="empty">P4$5W0rD!</span>}
          <button>
            <ion-icon name="copy-outline"></ion-icon>
          </button>
        </div>
        <form className="app__form" onSubmit={handleSubmit}>
          <div className="app__form-length">
            <header htmlFor="length">
              Character Length <span>{length}</span>
            </header>
            <input
              type="range"
              name="length"
              id="length"
              min="0"
              max="20"
              value={length}
              onInput={handleInputChange}
              ref={rangeInput}
            />
          </div>

          <div className="app__form-options">
            <div>
              <input
                type="checkbox"
                name="uppercase"
                id="uppercase"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
              />
              <label htmlFor="uppercase">Include Uppercase Letters</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="lowercase"
                id="lowercase"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
              />
              <label htmlFor="lowercase">Include Lowercase Letters</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="numbers"
                id="numbers"
                checked={numbers}
                onChange={(e) => setNumbers(e.target.checked)}
              />
              <label htmlFor="numbers">Include Numbers</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="symbols"
                id="symbols"
                checked={symbols}
                onChange={(e) => setSymbols(e.target.checked)}
              />
              <label htmlFor="symbols">Include Symbols</label>
            </div>
          </div>

          <div className="app__form-strength">
            <span className="app__form-strength-title">strength</span>
            <span
              className={`app__form-strength-items app__form-strength-items--${strengths[3]
                .replace(" ", "-")
                .toLocaleLowerCase()}`}
            >
              {strengths[3]}
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>

          <button className="app__form-button" type="submit">
            <span>Generate</span>{" "}
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
