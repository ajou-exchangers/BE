class UserInfoResponse {
	constructor(user) {
		this.email = user.email;
		this.nickname = user.nickname;
		this.profile = user.profile;
	}
}

module.exports = UserInfoResponse;
