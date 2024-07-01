
//-------------------Affouri-----------------

const logout= document.getElementById("logOut");
const username= sessionStorage.getItem("userName");
var usrediv=document.getElementById("Faubadge");
if (username === null || username === '') {
  usrediv.style.display="none";
  logout.style.display="none";
} else {

  usrediv.textContent="Welcome " + username;
  usrediv.style.display="block";
  logout.style.display="block";
}

function checkButton(value) {
  if (!value) {
    console.log("Button value is null or empty");
  } else {
    console.log("Button clicked: " + value);
var quizValue=sessionStorage.setItem('quizValu',value);
const loginEmail = sessionStorage.getItem("loginEmail");
const loginPassword = sessionStorage.getItem("loginPassword");
if(loginEmail !=null && loginEmail !="" && loginPassword !=null && loginPassword!= ""){
  window.location.href='/quizPage/Quiz-website/quizInstructions.html';
} else window.location.href='/SignIn&SignUp/index.html';

  }
}

function logOut(){
  sessionStorage.removeItem('loginEmail');
  sessionStorage.removeItem('loginPassword');
  sessionStorage.removeItem('userName');
  usrediv.style.display="none";
  logout.style.display="none";
 alert("You have been successfully logged out!");
}
// fajer - youtube page 


//-------------------------------------



function fetchVideo() {
  const apiKey = 'AIzaSyC8-nvA85Owx-PhFyeLO_oyi0Ov_1Ej3FY';
  const videoId = 'HG68Ymazo18';
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

  fetch(apiUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('Response was not ok');
          }
          return response.json();
      })
      .then(data => {
          if (data.items.length > 0) {
              const title = data.items[0].snippet.title;
              const description = data.items[0].snippet.description;
              const thumbnail = data.items[0].snippet.thumbnails.high.url;

              const videoHtml = `
                  <div class="Favideo">
                      <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  </div>
              `;

              document.getElementById('Fa-video-container').innerHTML = videoHtml;
          } else {
              document.getElementById('Fa-video-container').innerHTML = '<p>Video not found</p>';
          }
      })
      .catch(error => {
          console.error('Error:', error);
          document.getElementById('Fa-video-container').innerHTML = '<p>Error fetching video</p>';
      });
}

window.addEventListener('load', fetchVideo);

// Aseel - quizzes page 




// Aseel - newsletter pop-up 


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.AS_newsletter-form');
    const emailInput = document.querySelector('.AS_form-input');
    const popup = document.getElementById('AS_thankYoupopup');
    const closeBtn = document.querySelector('.AS_close-btn');
    const doneBtn = document.querySelector('.AS_done-btn');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (validateASEmail(emailInput.value)) {
        popup.style.display = 'block';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });
  
    doneBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });
  
    window.addEventListener('click', (event) => {
      if (event.target == popup) {
        popup.style.display = 'none';
      }
    });
  
    function validateASEmail(email) {
      const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return re.test(String(email).toLowerCase());
    }
  });

// Aseel - the contact me pop-up 

  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
  
 
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
  
    if (fullName && email && phone) {
       const modal = document.getElementById('thankYouModal');
      modal.style.display = 'block';
    } else {
      alert('Please fill in all fields.');
    }
  });
  
   document.querySelector('.AS_close-button').addEventListener('click', function() {
    const modal = document.getElementById('thankYouModal');
    modal.style.display = 'none';
  });
  
   window.addEventListener('click', function(event) {
    const modal = document.getElementById('thankYouModal');
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
  
  // ---------------------------------------------------------------------------------------------------
  
