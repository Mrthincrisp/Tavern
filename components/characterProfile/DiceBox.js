import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

export default function DiceBox() {
  const [twentiesRolled, setTwentiesRolled] = useState(0);
  const [hundredsRolled, setHundredsRolled] = useState(0);
  const [foursRolled, setfoursRolled] = useState(0);
  const [sixesRolled, setSixesRolled] = useState(0);
  const [eightsRolled, setEightsRolled] = useState(0);
  const [tensRolled, setTensRolled] = useState(0);
  const [twelvesRolled, setTwelvesRolled] = useState(0);

  const [hundredResults, setHundredsResults] = useState([]);
  const [twentyResults, setTwentyResults] = useState([]);
  const [fourResults, setFourResults] = useState([]);
  const [sixResults, setSixResults] = useState([]);
  const [eightResults, setEightResults] = useState([]);
  const [tenResults, setTenResults] = useState([]);
  const [twelveResults, setTwelveResults] = useState([]);

  const dice = (max, rolls, setResults) => {
    const resultsArray = [];
    for (let i = 0; i < rolls; i++) {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      const randomValue = array[0] / (0xffffffff + 1);
      const result = (Math.floor(randomValue * max) + 1);
      resultsArray.push(result);
    }
    setResults(resultsArray);
  };

  const smallDiceRoller = () => {
    dice(4, foursRolled, setFourResults);
    dice(6, sixesRolled, setSixResults);
    dice(8, eightsRolled, setEightResults);
    dice(10, tensRolled, setTenResults);
    dice(12, twelvesRolled, setTwelveResults);
  };

  const twentyRoller = () => {
    dice(20, twentiesRolled, setTwentyResults);
  };

  const hunderedRoller = () => {
    dice(100, hundredsRolled, setHundredsResults);
  };

  const handleChange = (rolled) => (e) => {
    rolled(e.target.value || 0);
  };

  const reset = () => {
    setTwentiesRolled(0);
    setHundredsRolled(0);
    setHundredsResults([]);
    setTwentyResults([]);
    setfoursRolled(0);
    setSixesRolled(0);
    setEightsRolled(0);
    setTensRolled(0);
    setTwelvesRolled(0);
    setFourResults([]);
    setSixResults([]);
    setEightResults([]);
    setTenResults([]);
    setTwelveResults([]);
  };

  const total = () => {
    const allResults = [
      ...fourResults,
      ...sixResults,
      ...eightResults,
      ...tenResults,
      ...twelveResults,
    ];
    return allResults.reduce((acc, curr) => acc + curr, 0);
  };

  return (
    <div className="dicebox-container">
      <div className="small-dice-row">
        <div className="die-box">
          <h6 className="d-header"> D4 </h6>
          <InputGroup>
            <Form.Control
              className="dice-input"
              type="number"
              value={foursRolled}
              onChange={handleChange(setfoursRolled)}
            />
          </InputGroup>
          <h6 className="result-header">Results:</h6>
          <textarea
            className="result-box"
            value={fourResults.join(', ')}
          />
        </div>

        <div className="die-box">
          <h6 className="d-header"> D6 </h6>
          <InputGroup>
            <Form.Control
              className="dice-input"
              type="number"
              value={sixesRolled}
              onChange={handleChange(setSixesRolled)}
            />
          </InputGroup>
          <h6 className="result-header">Results:</h6>
          <textarea
            className="result-box"
            value={sixResults.join(', ')}
          />
        </div>

        <div className="die-box">
          <h6 className="d-header"> D8 </h6>
          <InputGroup>
            <Form.Control
              className="dice-input"
              type="number"
              value={eightsRolled}
              onChange={handleChange(setEightsRolled)}
            />
          </InputGroup>
          <h6 className="result-header">Results:</h6>
          <textarea
            className="result-box"
            value={eightResults.join(', ')}
          />
        </div>
      </div>

      <div className="small-dice-row">
        <div className="die-box">
          <h6 className="d-header"> D10 </h6>
          <InputGroup>
            <Form.Control
              className="dice-input"
              type="number"
              value={tensRolled}
              onChange={handleChange(setTensRolled)}
            />
          </InputGroup>
          <h6 className="result-header">Results:</h6>
          <textarea
            className="result-box"
            value={tenResults.join(', ')}
          />
        </div>

        <div className="total">
          {total()}
        </div>

        <div className="die-box">
          <h6 className="d-header"> D12 </h6>
          <InputGroup>
            <Form.Control
              className="dice-input"
              type="number"
              value={twelvesRolled}
              onChange={handleChange(setTwelvesRolled)}
            />
          </InputGroup>
          <h6 className="result-header">Results:</h6>
          <textarea
            className="result-box"
            value={twelveResults.join(', ')}
          />
        </div>
      </div>

      <Button className="button" type="button" onClick={() => smallDiceRoller(4, foursRolled, fourResults)}>
        Roll Those Bones!
      </Button>
      <Button className="button clear-button" type="button" onClick={reset}>Clear</Button>

      <div className="large-dice-row">
        <div className="die-box">
          <h6 className="result-header"> D20 </h6>
          <InputGroup>
            <Form.Control
              className="dice-input"
              type="number"
              value={twentiesRolled}
              onChange={handleChange(setTwentiesRolled)}
            />
            <Button type="button" onClick={() => twentyRoller(20, twentiesRolled, twentyResults)}>
              Roll!
            </Button>
          </InputGroup>
          <h6 className="result-header">Results:</h6>
          <textarea
            className="result-box"
            value={twentyResults.join(', ')}
          />
        </div>

        <div className="die-box">
          <h6 className="result-header"> D100 </h6>
          <InputGroup>
            <Form.Control
              className="dice-input"
              type="number"
              value={hundredsRolled}
              onChange={handleChange(setHundredsRolled)}
            />
            <Button type="button" id="button-addon2" onClick={() => hunderedRoller(100, hundredsRolled, hundredResults)}>
              Roll!
            </Button>
          </InputGroup>
          <h6 className="result-header">Results:</h6>
          <textarea
            className="result-box"
            value={hundredResults.join(', ')}
          />
        </div>
      </div>
    </div>
  );
}
