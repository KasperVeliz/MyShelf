import { useState } from "react";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    return (
        <>
        <form onSubmit={(event) => {
            event.preventDefault()
            props.onLogin({username, password})
        }}>
            
        </form>
        </>
    )
}
export default Login