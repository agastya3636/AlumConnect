import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  // const [count, setCount] = useState(0)

 async function gen_ans(){ // function of generating the 
    console.log("loading")
    const response =await axios({

     
      data : {"contents":[{"parts":[{"text":"can u give the roadmap of dsa"+"give within 200 words"}]}]} // input of the user
    }) ;
    console.log(response['data']['candidates'][0]['content']['parts'][0]['text']); // output of the user
  }

  return (
    <>
       <h1>!!!! ChatBot !!!!</h1>
       <button onClick={gen_ans}>Get the Answer</button>
    </>
  );
}

export default App
