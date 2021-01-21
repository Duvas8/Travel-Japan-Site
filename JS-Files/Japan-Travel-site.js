const sections = document.querySelectorAll('section');
const navBubble = document.querySelector('.nav-bubble');
const barsContainer = document.querySelector('.barsContainer')
const ulNav = document.querySelector('.ul-nav');

const gradienrts = [
    "linear-gradient(to right, #36d1dc, #5b86e5)",
    "linear-gradient(to right, #dce35b, #45b649)",
    "linear-gradient(to right, #ff416c, #ff4b2b)",
    "linear-gradient(to right, #834d9b, #d04ed6)"
];

const options = {
    threshold: 0.65
};

let observer = new IntersectionObserver(navCheck, options)

function navCheck(entries) {
    entries.forEach(entry => {
    const className = entry.target.className;
    const activeAnchor = document.querySelector(`[data-page=${className}]`);
    const gradientIndex = entry.target.getAttribute(`data-index`);
    const coords = activeAnchor.getBoundingClientRect();
    const navBubbleDirection = {
        height: coords.height,
        width: coords.width,
        top: coords.top,
        left: coords.left
       };
       if (entry.isIntersecting) {
           navBubble.style.setProperty("height", `${navBubbleDirection.height}px`);
           navBubble.style.setProperty("width", `${navBubbleDirection.width}px`);
           navBubble.style.setProperty("top", `${navBubbleDirection.top}px`);
           navBubble.style.setProperty("left", `${navBubbleDirection.left}px`);
           navBubble.style.background = gradienrts[gradientIndex]
       }
    });
}

sections.forEach(section => {
    observer.observe(section);
});


barsContainer.addEventListener('click', () => {
    barsContainer.classList.toggle("change");
    ulNav.classList.toggle("open");
  });