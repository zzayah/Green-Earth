import { Form } from "react-router-dom";
import './login.css'

import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";



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
            if (response.status == 200) {
                if(logginIn) alert("Logged in!");
                else alert("Account created!");
            } else {
                if(logginIn) alert("Failed.");
                else alert("Failed to create account.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        
  });
        

    }

    return (
        <div class="main">
            {/* <div class="header">
                <h1>Green Earth</h1>
            </div> */}
            <div class="content">
                <div class="wrapper">
                    <h1>LOGIN</h1>
                    <form method="post" onSubmit={handleLogin}>
                        {/* Replace Labels with a div soon */}
                        <label><br></br></label>
                    <label>
                        <input name="username" placeholder='Username' /> <FaUser class="icon"/>
                    </label>
                    <label><br></br></label>
                    <label>
                        <input name="password" placeholder='Password'/> <FaLock class="icon"/>
                    </label>
                    <label><br></br></label>
                    <label>
                        Create User: <input type="checkbox" name="createUser" defaultChecked={false}></input>
                    </label>
                    <button type="submit">Login</button>
                    </form>
                </div>
            </div>

        </div>
    )
};