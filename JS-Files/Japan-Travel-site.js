const sections = document.querySelectorAll('section');
const navBubble = document.querySelector('.nav-bubble');
const barsContainer = document.querySelector('.barsContainer')
const ulNav = document.querySelector('.ul-nav');
const galleryItem = document.querySelector('.gallery-item');
const loginBtn = document.querySelector('.login-btn');
const loginContainer = document.querySelector('.login-container')

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
           navBubble.style.background = gradienrts[gradientIndex];

           
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

  loginBtn.addEventListener("click", () => {
    loginContainer.classList.toggle("open-login")
    loginForm.classList.remove("form__hidden");
    createAccountForm.classList.add("form__hidden");
  })

function setFormMessage(formElement, type, message){
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error")
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message){

    inputElement.classList.add(".form__input--error");
    inputElement.parentElement.querySelector(".form__input--error--message").textContent = message;
}

function clearInputError(inputElement){

    inputElement.classList.remove(".form__input--error");
    inputElement.parentElement.querySelector(".form__input--error--message").textContent = "";
}

  
      const loginForm = document.querySelector("#login");
      const createAccountForm = document.querySelector("#createAccount");

      document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form__hidden");
        createAccountForm.classList.remove("form__hidden");
      });

      document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form__hidden");
        createAccountForm.classList.add("form__hidden");
      });

      loginForm.addEventListener("submit", e => {
        e.preventDefault();

    // if iwant to submit the form using AJAX or Fetche i need to add " e - as a pareameter for the function  and  e.preventDefault".

        setFormMessage(loginForm, "error", "Invalid Username/Password");
        
      });
      
      document.querySelectorAll(".form__input").forEach(inputElement => {
          inputElement.addEventListener("blur", e => {
              if(e.target.id === signupUsername  &&  e.target.value.length > 0  &&  e.target.value.length < 8 ) {
                  setInputError(inputElement, "The username must be at least 8 characters in length");
              };
          });
          inputElement.addEventListener("input", e => {
              e.preventDefault();
              clearInputError(inputElement);
          })
      });

