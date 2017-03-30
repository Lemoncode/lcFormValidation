export class GitHub {
  doesLoginExists(login) {
    const baseGitHubUsersUrl = 'https://api.github.com/users/';
    const fetchGitHubUserUrl = baseGitHubUsersUrl + login;

    return fetch(fetchGitHubUserUrl)
      .then((response) => this.checkStatus(response))
      .then((response) => this.parseJSON(response))
      .then((data) => this.resolveLoginFound(data))
      .catch((error) => this.resolveLoginNotFound(error));
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      throw new Error(response.statusText);
    }
  }

  parseJSON(response) {
    return response.json();
  }

  resolveLoginFound(data) {
    return Promise.resolve(true);
  }

  resolveLoginNotFound(error) {
    return Promise.resolve(false);
  }
}

export const gitHub = new GitHub();
