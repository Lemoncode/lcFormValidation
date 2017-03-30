class GitHub {
  doesLoginExists(login: string): Promise<boolean> {
    const baseGitHubUsersUrl: string = 'https://api.github.com/users/';
    const fetchGitHubUserUrl: string = baseGitHubUsersUrl + login;

    return fetch(fetchGitHubUserUrl)
      .then((response) => this.checkStatus(response))
      .then((response) => this.parseJSON(response))
      .then((data) => this.resolveLoginFound(data))
      .catch((error) => this.resolveLoginNotFound(error));
  }

  private checkStatus(response: Response): Promise<Response> {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      throw new Error(response.statusText);
    }
  }

  private parseJSON(response: Response): any {
    return response.json();
  }

  private resolveLoginFound(data: any): Promise<boolean> {
    return Promise.resolve(true);
  }

  private resolveLoginNotFound(error: Error): Promise<boolean> {
    return Promise.resolve(false);
  }
}

export const gitHub = new GitHub();
