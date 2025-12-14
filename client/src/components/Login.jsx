import { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    return (
        <>
        <form onSubmit={(event) => (
            event.preventDefault()
        )}>
            
        </form>
        </>
    )
}
export default Login