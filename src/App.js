import "./App.scss";
import { useState, useEffect, useRef } from "react";

const App = () => {
  const maxLength = 20;
  const minLength = 0;

  const [length, setLength] = useState(10);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const handlePassword = () => {
    let options = [];
    if (uppercase) options.push("ABCDEFGHIJKLMNOPQRSTUVWXY".split(""));
    if (lowercase) options.push("abcdefghijklmnopqrstuvwxy".split(""));
    if (numbers) options.push("0123456789".split(""));
    if (symbols) options.push("~!@#$%^&*(-)_+={}[]|:;<>,.?".split(""));

    if (options.length) {
      let _password = "";
      for (let i = 1; i <= length; i++) {
        let caracs = options[Math.floor(Math.random() * options.length)];
        let carac = caracs[Math.floor(Math.random() * caracs.length)];
        _password += carac;
      }
      return _password;
    }
  };

  const handleStrength = () => {
    if (!password) return;

    let points = 0;
    let _strength = "";

    points = lowercase ? points + 1 : points;
    points = uppercase ? points + 1 : points;
    points = numbers ? points + 2 : points;
    points = symbols ? points + 2 : points;

    if (password.length > 12) points = points + 8;
    else if (password.length >= 9) points = points + 6;
    else if (password.length >= 7) points = points + 4;
    else if (password.length >= 6) points = points + 2;
    else points = points + 1;

    if (points > 11) _strength = "Very Strong";
    else if (points > 9) _strength = "Strong";
    else if (points > 7) _strength = "Medium";
    else _strength = "Weak";

    return _strength;
  };

  const [password, setPassword] = useState(handlePassword());
  const [strength, setStrength] = useState(handleStrength());

  const handleSubmit = (e) => {
    e.preventDefault();
    setPassword(handlePassword());
    setStrength(handleStrength());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
  };

  // Setting Length and range input backgroundSize
  const rangeInput = useRef(null);
  const handleInputChange = () => {
    const min = rangeInput.current.min;
    const max = rangeInput.current.max;
    const val = rangeInput.current.value;

    rangeInput.current.style.backgroundSize =
      ((val - min) * 100) / (max - min) + "% 100%";

    setLength(val);
  };

  useEffect(() => {
    if (rangeInput) handleInputChange();
  }, [rangeInput]);

  // Disable submit button when options are not defined
  const buttonSubmit = useRef(null);
  useEffect(() => {
    if (length === "0" || (!uppercase && !lowercase && !numbers && !symbols)) {
      buttonSubmit.current.setAttribute("disabled", "");
    } else {
      buttonSubmit.current.removeAttribute("disabled");
    }
  }, [length, uppercase, lowercase, numbers, symbols]);

  return (
    <div className="app">
      <div className="app__container">
        <h1 className="app__title">Password Generator</h1>

        <div className="app__password">
          <span>{password}</span>
          <button onClick={handleCopy}>
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
              min={minLength}
              max={maxLength}
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
            <span className="app__form-strength-items" data-strength={strength}>
              {strength}
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>

          <button className="app__form-button" type="submit" ref={buttonSubmit}>
            <span>Generate</span>
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
