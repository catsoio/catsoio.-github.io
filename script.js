const form = document.getElementById("subscribe-form");
const subtxt = document.getElementById("sub-text");
(() => {
  const user = localStorage.getItem("user");
  if (user !== null) {
    form.classList.add("after-submit");
    subtxt.innerHTML = "You're already subscribed :)"
  }

  // Specify the deadline date
  const deadlineDate = new Date("Aug 1, 2023 00:00:00").getTime();

  // Cache all countdown boxes into consts
  const countdownDays = document.querySelector(".countdown__days .number");
  const countdownHours = document.querySelector(".countdown__hours .number");
  const countdownMinutes = document.querySelector(".countdown__minutes .number");
  const countdownSeconds = document.querySelector(".countdown__seconds .number");

  // Update the count down every 1 second (1000 milliseconds)
  setInterval(() => {
    // Get current date and time
    const currentDate = new Date().getTime();

    // Calculate the distance between current date and time and the deadline date and time
    const distance = deadlineDate - currentDate;

    // Calculations the data for remaining days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Insert the result data into individual countdown boxes
    countdownDays.innerHTML = days;
    countdownHours.innerHTML = hours;
    countdownMinutes.innerHTML = minutes;
    countdownSeconds.innerHTML = seconds;
  }, 1000);
})();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const serializedData = Object.fromEntries(formData.entries());

  fetch("http://localhost:3001/auth/users", {
    method: "POST",
    body: JSON.stringify(serializedData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      console.log(data);
      if (data.status === 400) {
        // success
        form.classList.add("after-submit");
        document.getElementById("submited-text").innerHTML = "Thank u for sumbetting";
        localStorage.setItem("user", serializedData["form-email"]);
      } else {
        location.reload();
      }
    })
    .catch((error) => console.error(error));
});
