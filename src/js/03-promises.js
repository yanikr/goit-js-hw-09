import Notiflix from 'notiflix';

const formInput = document.querySelector('.form');
const inputDelay = document.querySelector('[name="delay"]');
const inputAmount = document.querySelector('[name="amount"]');
const inputStep = document.querySelector('[name="step"]');

inputDelay.addEventListener('input', event => {
  delayValue = parseInt(event.currentTarget.value);
});
inputAmount.addEventListener('input', event => {
  amountValue = parseInt(event.currentTarget.value);
});
inputStep.addEventListener('input', event => {
  stepValue = parseInt(event.currentTarget.value);
});

formInput.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  promiseCycle(delayValue, stepValue, amountValue);
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

function promiseCycle(delayValue, stepValue, amountValue) {
  let delay = 0;
  for (let i = 1; i <= amountValue; i += 1) {
    delay = delayValue + stepValue * (i - 1);
    createPromise(i, delay)
      .then(({ position, delay }) => {
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(
          `✅Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(`❌Rejected promise ${position} in ${delay}ms`);
      });
  }
}
