/**
 * Bronwijs - Scroll animations (AOS) initialization
 */
document.addEventListener('DOMContentLoaded', function () {
  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 900,
      easing: 'ease-out-quart',
      once: true,
      offset: 100,
      anchorPlacement: 'top-bottom',
    });
  }

  // Animate architecture card bottom lines on scroll
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.arch-card-line').forEach(function (line) {
    observer.observe(line);
  });
});
