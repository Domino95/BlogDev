export function handleFormLabel(NameRef) {
    if (NameRef.current.children[0].value !== "") {
        NameRef.current.children[1].className = "--active"
        NameRef.current.children[2].hidden = false
    }
    else {
        NameRef.current.children[1].className = null
        NameRef.current.children[2].hidden = true
    }
}

export function handlePasswordType(PasswordRef) {
    if (PasswordRef.current.children[0].type === "password")
        PasswordRef.current.children[0].type = "text"
    else
        PasswordRef.current.children[0].type = "password"
}

export function validation(password, repeatpassword) {
    if (password === repeatpassword) return true
    return false
}
