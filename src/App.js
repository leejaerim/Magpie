import Table from "./components/Table";
import Header from "./components/Header";
import HomeTab from "./components/HomeTab";
import {useState} from "react";
import {Outlet} from "react-router-dom";
import {addDoc, collection, doc, onSnapshot, query, updateDoc, where} from "firebase/firestore";
import {dbService} from "./fbase";

function App() {
    const [sum , setSum] = useState(0)
    const [ref , setRef] = useState(null);
    const dateTime = new Date()
    onSnapshot(query(collection(dbService, "payment"), where("date", "==", `${dateTime.getFullYear()}-${dateTime.getMonth()}-${dateTime.getDate()}`)), async obj => {
        if(obj.docs.length == 0){
            const table_result = {
                value: 0,
                date: `${dateTime.getFullYear()}-${dateTime.getMonth()}-${dateTime.getDate()}`,
            }
            try {
                const docRef = await addDoc(collection(dbService, "payment"), table_result)
            } catch (e) {
            }
        }else{
            setSum(prev=>obj.docs[0].data().value)
            setRef(doc(dbService, "payment", `${obj.docs[0].id}`));
        }
    })
    const table_price= (table_value)=>{
        if(ref != null){
            updateDoc(ref, { value: sum+table_value});
        }
        setSum(prev => prev+table_value);
    }
  return (
    <div className="App">
        <Header table_sum={sum}></Header>
        <Outlet context={[table_price]}/>
    </div>
  );
}

export default App;
