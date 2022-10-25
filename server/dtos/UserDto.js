class UserDTO {
    id;
    name;
    surname;
    email;
    isVerified;

    constructor(user) {
        this.id = user._id;
        this.name = user.name;
        this.surname = user.surname;
        this.email = user.email;
        this.isVerified = user.isVerified;
    }
}

module.exports = UserDTO