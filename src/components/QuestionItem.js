import React from "react";

function QuestionItem({ question, questions, setQuestions }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const deleteQuestion = e =>{
    e.preventDefault();
    fetch(`http://localhost:4000/questions/${e.target.id}`, {
      method:"DELETE"
    })
    .then(res => res.json())
    .then(setQuestions(questions.filter(question => question.id.toString() !== e.target.id)))
  }

  const handleChange = e => {
    e.preventDefault();
    const correctedIndex = parseInt(e.target.value, 10); // Parse the selected index as integer
  
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        correctIndex: correctedIndex // Update correctIndex in the body
      })
    })
    .then(res => res.json())
    .then(editedQuestion => {
      // Update questions state with the edited question
      const newQuestions = questions.map(q => q.id === question.id ? editedQuestion : q);
      setQuestions(newQuestions);
    })
    .catch(error => {
      console.error('Error updating question:', error);
    });
  }
  

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button id = {id} onClick = {deleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
