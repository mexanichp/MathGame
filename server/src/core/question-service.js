const operators = ['/', '*', '-', '+'];

const result = {
  question: '',
  proposedAnswer: '',
  isProposedAnswerCorrect: false,
  isAnswered: false,
  fulfillQuestionAndOptions() {
    const n1 = getRandomInt(1, 11);
    const n2 = getRandomInt(1, 11);
    const op = operators[getRandomInt(0, operators.length)]

    const correctAnswer = getArithmeticDone(n1, n2, op);

    if (Math.random() > .5) {
      this.isProposedAnswerCorrect = true;
      this.proposedAnswer = correctAnswer;
    } else {
      this.isProposedAnswerCorrect = false;
      const sault = getRandomInt(2, 10);
      this.proposedAnswer = getArithmeticDone(this.proposedAnswer, sault, operators[getRandomInt(0, operators[operators.length])]);
    }

    this.question = n1 + op + n2;
    this.isAnswered = false;
  }
}

function getArithmeticDone(n1, n2, op) {
  let res;
  if (op === '/') {
    res = n1 / n2;
  } else if (op === '*') {
    res = n1 * n2;
  } else if (op === '-') {
    res = n1 - n2;
  } else {
    res = n1 + n2;
  }

  return res;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

result.fulfillQuestionAndOptions.bind(result);

module.exports = result;