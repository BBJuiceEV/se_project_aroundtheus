export default class UserInfo {
  constructor(profileName, profileDescription) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
  }

  getUserInfo() {
    const UserIdentity = {
      name: this._profileName.textContent,
      job: this._profileDescription.textContent,
    };
    return UserIdentity;
  }
  setUserInfo(UserIdentity) {
    this._profileName.textContent = UserIdentity.name;
    this._profileDescription.textContent = UserIdentity.job;
  }
}
