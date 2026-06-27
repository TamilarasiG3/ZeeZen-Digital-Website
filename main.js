document
.getElementById("contactForm")
.addEventListener("submit", function(e){

e.preventDefault();

alert(
"Thank you for contacting ZeeZen Digital. We will get back to you soon."
);

this.reset();

});