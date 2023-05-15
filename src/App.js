import Table from "./components/Table";
import Header from "./components/Header";
import HomeTab from "./components/HomeTab";
import React, {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {addDoc, collection, doc, onSnapshot, query, updateDoc, where} from "firebase/firestore";
import {AuthService, dbService} from "./fbase";
import AuthForm from "./components/AuthForm";
import {getPayment, postPayment} from "./api/api_payment";
import {useQuery} from "@tanstack/react-query";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(AuthService.currentUser);
    const [sum , setSum] = useState(0)
    let dateTime = new Date();
    dateTime.setHours(dateTime.getHours() + 9);
    dateTime = dateTime.toISOString().replace('T', ' ').substring(0, 19);
    // const { isLoading, data:dataMap ,refetch} = useQuery([`payment`,dateTime.split(' ')[0]], getPayment);
    useEffect(() => {
        AuthService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
                //setUserObj(user)
            } else {
                setIsLoggedIn(false);
            }
        })
    }, [])
    useEffect(()=>{
        // if(!isLoading){
        //     let temp = 0
        //     dataMap.row.forEach(i=>temp+=i.value)
        //     setSum(prev=>temp)
        // }
        onSnapshot(query(collection(dbService, "payment"), where("date", ">=", dateTime.split(' ')[0])), async obj => {
            if(obj.docs.length != 0){
                let temp = 0
                obj.docs.map(data=>{ temp += data.data().value;})
                setSum(temp)
            }else{
                setSum(prev=>0)
            }
        })
    },[])

    const table_price= async (table_value)=>{
        const table_result = {
            date: dateTime,...table_value
        }
        try {
            const docRef = await addDoc(collection(dbService, "payment"), table_result)
        } catch (e) {
            console.log(e)
        }
    }
  return (
    <div className="App">
        {isLoggedIn ? (<><Header table_sum={sum}></Header>
            <Outlet context={[table_price]}/></>):<AuthForm/>}

    </div>
  );
}

export default App;
