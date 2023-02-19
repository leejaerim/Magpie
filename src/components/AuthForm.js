import React, {useState} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {AuthService} from "../fbase";
import {Button} from "@chakra-ui/react";

const AuthForm =()=>{
    const [error, setError] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);


    const toggleAccount = ()=>{
        setNewAccount(prev=>!prev);
    }
    const onChange = (e) =>{
        const {target : {name, value}} = e;
        if(name === "email"){
            setEmail(value)
        }else if(name === "password"){
            setPassword(value)
        }
    }
    const onSubmit =async (e)=>{
        e.preventDefault();
        try{
            let data;
            if(newAccount){
                //create Account
                data = await createUserWithEmailAndPassword(AuthService, email,password);

            }else{
                //login
                data = await signInWithEmailAndPassword(AuthService,email,password);
            }
            console.log(data)
        }catch(e){
            setError(e.message);
        }

    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email"type="email" placeholder="Eamil" required value={email} onChange={onChange}>
                </input>
                <input name="password" type="password" placeholder="Eamil" required value={password}onChange={onChange}>
                </input>
                <Button
                    colorScheme='twitter'
                    type='submit'
                >
                    {newAccount ? "Create Account" : "Login"}
                </Button>
                <Button colorScheme={"twitter"} onClick={toggleAccount}> {newAccount ? "Login" : "Join in" } </Button>
            </form>
            {error}

        </div>

    )
}
export default AuthForm