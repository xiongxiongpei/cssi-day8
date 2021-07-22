const passwordView = document.querySelector("#passcodeInput");
const passwordInput = document.querySelector("#passcode");
const errorView = document.querySelector("#errorView");

const modalView = document.querySelector("#modalView");
const modalText = document.querySelector("#modalText");
const modalClose = document.querySelector("#modalClose");

const buttonRef = document.querySelector("#viewMsg");
var tries = 10;
const getMessages = () => {
    const messagesRef = firebase.database().ref("/messages");
    messagesRef.on('value', (snapshot) => {
        const password = passwordInput.value;
        const raw_data = snapshot.val();
        const data = raw_data.filter(message => message.password == password).map(e => e.content);
        if (data.length == 0) {
            if (tries == 0) {
                errorView.innerText = "Try again after 5 minutes.";
                buttonRef.disabled = true;
                setTimeout(function() {
                    buttonRef.disabled = false;
                }, 300000)
                
            } 
            else if (tries <= 3) {
                errorView.innerText = "Try again after 3 minutes.";
                buttonRef.disabled = true;
                setTimeout(function() {
                    buttonRef.disabled = false;
                }, 180000)
            }
            else if (tries <= 5) {
                errorView.innerText = "Try again after 1 minute.";
                buttonRef.disabled = true;
                setTimeout(function() {
                    buttonRef.disabled = false;
                }, 60000)
            }
            else {
                errorView.innerText = "Wrong passcode :/ " + (--tries) + " tries remaining";  
            }
        } else {
            // passwordView.innerHTML = ""
            // Enable modal
            modalView.classList.add("is-active");
            modalText.innerHTML = data.join("<br>");
        }
    });
}
//hide passcode view
 const passcodeInput = document.querySelector('#passcodeInput');
 passcodeInput.style.display = 'none';
 //show message
modalClose.addEventListener("click", () => {
    modalView.classList.remove("is-active");
})