import { Form } from "react-router-dom";

export default function Login(){

    function handleLogin(e){
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        var logginIn = formJson["createUser"] != "on";

        var serverUrl;

        if(!logginIn){
            serverUrl = "http://localhost:8080/login/create";
        }else{
            serverUrl = "http://localhost:8080/login/auth";
        }
        fetch(serverUrl, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(formJson)
        })
        .then(response => {
            console.log(response);
            if (response.ok) {
                console.log("Login successful!");
                if(logginIn) alert("Logged in!");
            } else {
                console.log("Login failed.");
                if(logginIn) alert("Failed.");
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
            <label>
                Create User: <input type="checkbox" name="createUser" defaultChecked={false}></input>
            </label>
            <hr />
            <button type="submit">Login</button>
            </form>
        </div>
    )
};