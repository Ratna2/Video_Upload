import axios from "axios";
import React, {useState, useEffect} from "react";
import "./App.css";
import Card from "./components/Card";
import { Navbar } from "./components/Navbar";
import UploadForm from "./components/UploadForm";
import UploadList from "./components/UploadList";
import { BACKEND_URI } from "./config/constant";

function App() {

  const [media, setMedia] = useState([])

  useEffect(()=>{
    getAll()
  }, [])

  const getAll = ()=>{
    axios.get(`${BACKEND_URI}/api/media/getAll`).then((result)=>{
      setMedia(result.data)
    }).catch(error=>{
      console.log(error);
      alert('Some Error occured')
    })
  }

  return (
    <div className="App">
      <Navbar/>
      <div className="row">
        <Card name={<UploadForm getall={getAll} />} />
        <Card name={<UploadList media={media}/>} />
      </div>
    </div>
  );
}

export default App;
