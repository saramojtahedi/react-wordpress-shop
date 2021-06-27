

const change_loader = (bool) => ({
    type: "LOADER",
    payload: bool
})

const user_role = (role) => ({
    type: "ROLE",
    payload: role
})

const check_login = (check) => ({
    type: "LOGIN",
    payload: check
})

const get_tags = (tags) => ({
    type: "TAGS",
    payload: tags
})

const get_users = (users) => ({
    type: "USERS",
    payload: users
})

export {
    change_loader,
    user_role,
    check_login,
    get_tags,
    get_users
}