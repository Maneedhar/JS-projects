// Initialize GITHUB
const github = new GitHub;

//Initialize UI
const ui = new UI;


//Search input
const searchUser = document.getElementById('searchUser');

//Search Inputs event Listener
searchUser.addEventListener('keyup',(e) => {
  // Get input text
  const userText = e.target.value;

  if(userText !== ''){
    // make HTTP CALL
    github.getUser(userText)
      .then(data => {
        if(data.profile.message === 'Not Found'){
          //Show Alert user not found
          ui.showAlert('User Not Found', 'alert alert-danger');
        } else {
          //Show profile
          ui.showProfile(data.profile);
          ui.showRepos(data.repos);
        }
      })
  } else {
    //Clear Profile
    ui.clearProfile();
  }
})