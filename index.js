document.addEventListener('DOMContentLoaded', () => { //fixed why the scrolling didn't work || Check DOM Content Ready: If your script is executed before the DOM is fully loaded, the carousel variable may not reference the correct element.


//horizontal slider from chatGPT
const carousel = document.querySelector('.carousel-container');
const scrollSpeed = 10; // Adjust scroll speed as needed

carousel.addEventListener('mouseenter', () => {
  carousel.classList.add('smooth-scroll'); // Add smooth scroll class
});

carousel.addEventListener('mouseleave', () => {
  carousel.classList.remove('smooth-scroll'); // Remove smooth scroll class
});

carousel.addEventListener('mousemove', (e) => {
  const scrollDirection = e.clientX > carousel.offsetWidth / 2 ? 1 : -1;
  const scrollAmount = scrollDirection * scrollSpeed;
  carousel.scrollLeft += scrollAmount;
});




function startAnimation(e) {
  if (!isAnimating) {
    isAnimating = true;
    const scrollDirection = e.clientX > carousel.offsetWidth / 2 ? 1 : -1;
    const scrollAmount = scrollDirection * scrollSpeed;
    cancelAnimationFrame(requestId);
    requestId = requestAnimationFrame(() => {
      animateScroll(carousel, scrollAmount);
      isAnimating = false;
    });
  }
}

function animateScroll(element, amount) {
  let start = element.scrollLeft;
  let currentTime = 0;
  const increment = 5; // Smaller values make smoother animation
  const duration = 200; // Duration of the animation in milliseconds

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  function scroll() {
    currentTime += increment;
    const val = easeInOutQuad(currentTime, start, amount, duration);
    element.scrollLeft = val;
    if (currentTime < duration) {
      requestAnimationFrame(scroll);
    }
  }
  scroll();
}
});



//text animation - code snippet
function animate(options) {

  var start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction от 0 до 1
    var timeFraction = (time - start) / options.duration;
    if (timeFraction > 1) timeFraction = 1;

    // текущее состояние анимации
    var progress = options.timing(timeFraction)

    options.draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}


//real-time clock from chatGPT
function updateClock() {
  const now = new Date(); // Get the current date and time
  let hours = now.getHours(); // Get the current hour (0-23)
  const minutes = now.getMinutes(); // Get the current minute (0-59)
  
  // Determine if it's AM or PM
  const amPm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Format the time as HH:MM AM/PM
  const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amPm}`;

  // Update the content of the clock element with the current time
  document.getElementById('clock').textContent = timeString;
}

// Call updateClock function every second to update the time
setInterval(updateClock, 1000);
