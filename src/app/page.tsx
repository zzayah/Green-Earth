import Image from "next/image";

'use client';


let name = "John Doe";

export default function Home() {
  
  return (
    <main>
      <h1>Green Earth Test</h1>
      <h2 id="name">Name: {name} </h2>
      <br></br>
      <div id="buttonHolder">
        <button id="click" onClick={getName}>Click Me!</button>
        <br></br>
        <button id="click" onClick={showName}>Show name!</button>
      </div>
    </main>
  );
}

function getName(){
  let tmp = prompt("Name?");
  let yeah = confirm("Name is " + tmp + ", correct?");
  if(tmp && yeah){
    name = tmp;
  }
  let nameHTML = document.getElementById("name");
  if(nameHTML)
    nameHTML.innerHTML = "Name: " + name;
}

function showName(){
  alert(name);
}