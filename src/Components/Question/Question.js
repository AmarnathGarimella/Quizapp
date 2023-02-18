import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./Question.css";
const Questions = (props) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSelect = (option) => {
    if (selected === option && selected === props.correct) return "right";
    else if (selected === option && selected !== props.correct) return "wrong";
    else if (option === props.correct) return "right";
  };

  const handleCheck = (option) => {
    setSelected(option);
    if (option === props.correct) {
      props.setScore(props.score + 1);
    }
    setError(false);
  };

  // const handleQuit = () => {};

  const handleNext = () => {
    if (props.currQues > 8) {
      navigate("/result");
    } else if (selected) {
      props.setCurrQues(props.currQues + 1);
      setSelected();
    } else {
      setError("true");
    }
  };
  return (
    <div className="question">
      <h1>Question {props.currQues + 1}</h1>
      <div className="singleQuestion">
        <h2>{props.questions[props.currQues].question}</h2>
        <div className="options">
          {error && <ErrorMessage>Please Select an option first</ErrorMessage>}
          {props.options &&
            props.options.map((i) => {
              return (
                <button
                  onClick={() => {
                    handleCheck(i);
                  }}
                  className={`singleOption ${selected && handleSelect(i)}`}
                  key={i}
                  disabled={selected}
                >
                  {i}
                </button>
              );
            })}
        </div>
        <div className="controls">
          <Button
            color="secondary"
            variant="contained"
            size="large"
            style={{ width: 185 }}
            href="/"
            // onClick={handleQuit}
          >
            Quit
          </Button>
          <Button
            color="primary"
            variant="contained"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            Next Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
