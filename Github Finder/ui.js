class UI {
  constructor(){
    this.profile = document.getElementById('profile');
  }

  // Display Profile
  showProfile(user){
    this.profile.innerHTML = `
      <div class="car card-body mb-3">
        <div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${user.avatar_url}">
            <a href="${user.html_url}" target="_blank" calss="btn btn-primary btn-block">View Profile</a>
          </div>
          <div class="col-md-9">
            <span class="badge badge-primary">Public Repositories: ${user.public_repos}</span>
            <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
            <span class="badge badge-success">Followers: ${user.followers}</span>
            <span class="badge badge-info">Following: ${user.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Company: ${user.company}</li>
              <li class="list-group-item">Website/Blog: ${user.blog}</li>
              <li class="list-group-item">Location: ${user.location}</li>
              <li class="list-group-item">Member Since: ${user.created_at}</li>
            </ul>
          </div>
        </div>
      </div>
      <h3 class="pageheading mb-3">Latest Repositories</h3>
      <div id="repos"></div>
    `;
  }

  //Show User Repos
  showRepos(repos){
    let output = '';
    repos.forEach((repo) => {
      output += `
      <div class="card card-body mb-2">
        <div class="row">
          <div class="col-md-6">
            <a href="${repo.html_url}" target="">${repo.name}</a>
          </div>
          <div class="col-md-6">
          <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
          <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
          <span class="badge badge-primary">forks: ${repo.forks_count}</span>
          </div>
        </div>
      </div>       
      `;
    })

    //Output repos
    document.getElementById('repos').innerHTML = output;
  }

  //Show Alert Message for USER NOT FOUND
  showAlert(msg, className){
    //Clear any remaining alerts
    this.clearAlert();

    //Create a div
    const div = document.createElement('div');

    //Add Classes
    div.className = className; 

    //Add Alert Message
    div.appendChild(document.createTextNode(msg));

    //Get Parent
    const container = document.querySelector('.searchContainer');

    //Get search box
    const search = document.querySelector('.search');

    //Insert Alert
    container.insertBefore(div, search);

    //Timeout after 3 secs
    setTimeout(() => {
      this.clearAlert();
    }, 3000)
  }

  //Clear Alert
  clearAlert(){
    const currentAlert = document.querySelector('.alert');

    if (currentAlert){
      currentAlert.remove();
    }
  }

  //Clear Profile when SEARCH CLEARED
  clearProfile(){
    this.profile.innerHTML = '';
  }
}