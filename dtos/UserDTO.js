class UserDTO {
    id;
    email;
    login;
    isActivated;
    roles;

    constructor(model) {
        this.id = model._id;
        this.login = model.login;
        this.email = model.email;
        this.isActivated = model.isActivated;
        this.roles = model.roles;
    }
}

export default UserDTO