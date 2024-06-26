
const messageForm = document.getElementsByClassName('message-form');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatBox = document.querySelector('#chat-box');
const welcomeText = document.getElementById('welcome-text');


// Check for user logIn, if user already Loged In then it removes Sign Up button
const checkLogIn = () => { 
  eel.logIn()(function(check){	 
    if (check == true) {
      document.querySelector('#signUp-btn').remove();
    } 
  });
}
// Call the checkLogIn function on page load
window.addEventListener('load', checkLogIn);


// setting up the light and dark theme
const changeTheme = () => {
  const body = document.body;
  const checkbox = document.getElementById('darkmode-toggle');
  const newTheme = checkbox.checked ? 'light' : 'dark';

  // Update body class and localStorage
  body.classList.toggle('light-theme', newTheme === 'light');
  localStorage.setItem('preferred-theme', newTheme);
};

// Checkbox change event listener
const themeCheckbox = document.getElementById('darkmode-toggle');
themeCheckbox.addEventListener('change', changeTheme);


// Function to change theme on page reload based on local storage
const changeThemeOnReload = () => {
  const body = document.body;
  const checkbox = document.getElementById('darkmode-toggle')
  const preferredTheme = localStorage.getItem('preferred-theme');

  // Update body class based on preferred theme
  if (preferredTheme === 'light') {
    checkbox.checked = true;
    body.classList.toggle('light-theme');
  }
  else if (preferredTheme === 'dark') {
    checkbox.checked = false;
}
};
// Call the changeTheme function on page load
window.addEventListener('load', changeThemeOnReload);


let isScrolledToBottom = true;

messageInput.addEventListener('keydown', function (event) {
	if (event.key === 'Enter') {
    welcomeText.remove();
		sendButton.click()
	}
})

const show_user_query = (query) => {
  document.querySelector('#chat-box').innerHTML +=
    "<br><div class='container'><img id='user-icon' src='img/user_icon.png' alt=''><p class='text-container user'>" + query + "<br></p></div>";
  scrollIfNeeded();
}

// function to show AI response with autoscroll
const show_ai_ans = (ans) => {
  const container = document.querySelector('#chat-box');
  const div = document.createElement('div');
  div.className = 'container';
  const img = document.createElement('img');
  img.id = 'ai-icon';
  img.src = 'img/pinac_logo.png';
  img.alt = '';
  const p = document.createElement('p');
  p.className = 'text-container ai';
  div.appendChild(img);
  div.appendChild(p);
  container.appendChild(div);

  let index = 0;
  const timer = setInterval(function () {
    p.innerHTML += ans[index].replace(/\n/g, '<br>');
    container.scrollTop = container.scrollHeight;
    index++;
    if (index >= ans.length) {
      clearInterval(timer);
      scrollIfNeeded();
    }
  }, 10);
}


const give_response = () => {
  if (messageInput.value !== '') {

    //Disable while AI generates response
    messageInput.disabled = true;
    sendButton.disabled = true;
    
    // Show user query
    show_user_query(messageInput.value);

    // Show loading animation
    showLoadingAnimation();

    // Call AI response function
    eel.giveResponse(messageInput.value)(function (response) {
      // Hide loading animation
      hideLoadingAnimation();
      // Show AI response
      show_ai_ans(response);

      //Enable after AI generates response
      messageInput.disabled = false;
      sendButton.disabled = false;

    });
  }
  messageInput.value = '';
}

const showLoadingAnimation = () => {
  // Create loading animation elements
  const loadingAnimation = document.createElement("div");
  loadingAnimation.className = "loading-animation";
  loadingAnimation.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';

  // Append loading animation to chat box
  chatBox.appendChild(loadingAnimation);
}

const hideLoadingAnimation = () => {
  // Remove loading animation
  const loadingAnimation = document.querySelector(".loading-animation");
  if (loadingAnimation) {
    loadingAnimation.remove();
  }
}

const scrollIfNeeded = () => {
  isScrolledToBottom =
    chatBox.scrollHeight - chatBox.scrollTop === chatBox.clientHeight;

  if (isScrolledToBottom) {
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}



//functions to make the hamburger menu-->
const menu_open = () => {
  document.getElementById("mySidebar").style.display="block";
}
const menu_close = () => {
  document.getElementById("mySidebar").style.display="none";
}


//functions to redirect the page to a new respective pages-->
const clearChat = () => {
  eel.clearMemory();
  window.location.href = 'index.html';
}

const redirectToAbout = () => {
  window.location.href = 'about.html';
}

const redirectToProfile = () => {
  window.location.href = 'profile.html';
}

const displayAnimatedWelcomeText = (delay = 200) => {
  // Define multi line welcome message
  const welcome_multi_msg = [
    'Hello, how can I help you today.',
    'Stay at the top of your schedule with me.',
    'Have any questions? Just ask me.'
  ];

  let lineIndex = 0; // Initialize index to track current line
  let charIndex = 0; // Initialize index to track current character within the line

  const intervalId = setInterval(function() {
    const line = welcome_multi_msg[lineIndex]; // Get the current line from the message
    const char = line[charIndex]; // Get the current character from the line
    const element = welcomeText;

    element.innerHTML += char; 
    charIndex++; // Move to the next character

    if (charIndex == line.length){
      charIndex = 0; // Reset character index
      lineIndex++; // Move to the next line
    
    // If reached end of message, reset the cycle
    if (lineIndex === welcome_multi_msg.length) {
      lineIndex = 0;
      element.innerHTML = ''; // Clear the welcome message
    }else{
      // Add a delay before clearing innerHTML
      setTimeout(function() {
        element.innerHTML = ''; // Clear the welcome message
      }, delay=50);
    }
  }
  }, delay); // Delay for displaying each character
}