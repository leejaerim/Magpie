import Table from "./components/Table";
import Header from "./components/Header";
import HomeTab from "./components/HomeTab";
import {useState} from "react";

function App() {
    const [sum , setSum] = useState(0)
    const table_price=(table_value)=>{
        setSum(prev => prev+table_value)
    }
  return (
    <div className="App">
        <Header table_sum={sum}></Header>
        <HomeTab table_price={table_price}></HomeTab>
    </div>
  );
}

export default App;
