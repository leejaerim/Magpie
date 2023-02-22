import Table from "./components/Table";
import Header from "./components/Header";
import HomeTab from "./components/HomeTab";
import {useState} from "react";
import {Outlet} from "react-router-dom";

function App() {
    const [sum , setSum] = useState(0)
    const table_price=(table_value)=>{
        setSum(prev => prev+table_value)
    }
  return (
    <div className="App">
        <Header table_sum={sum}></Header>
        <Outlet context={[table_price]}/>
    </div>
  );
}

export default App;
