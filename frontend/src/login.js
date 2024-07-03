import { Form } from "react-router-dom";

export default function Login(){

    function handleLogin(e){
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        fetch("http://localhost:8080/login/auth", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(formJson)
        })
        .then(response => {
            if (response.ok) {
            console.log("Login successful!");
            } else {
            console.log("Login failed.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
  });
        

    }

    return (
        <div>
            <h1>LOGIN</h1>
            <form method="post" onSubmit={handleLogin}>
            <label>
                UserName: <input name="username" />
            </label>
            <hr/>
            <label>
                Password: <input name="password" />
            </label>
            <hr/>
            <button type="submit">Login</button>
            </form>
        </div>
    )
};