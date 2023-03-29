import React, {useState} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {AuthService} from "../fbase";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay, Box,
    Button, Input, Text, useDisclosure
} from "@chakra-ui/react";

const AuthForm =()=>{
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [error, setError] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);


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
            <Button colorScheme='red' onClick={onOpen}>
                Login
            </Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Login
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <Input name={"email"} type={'email'} value={email} placeholder={"Email"} onChange={onChange} required></Input>
                            <Input name={"password"} type={'password'} value={password} placeholder={"Password"} onChange={onChange} required></Input>
                            {error}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onSubmit}>
                                Login
                            </Button>
                            <Button colorScheme='red' ref={cancelRef}  onClick={onClose} ml={3}>
                                Cancel
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            {/*<form onSubmit={onSubmit}>*/}
            {/*    <input name="email"type="email" placeholder="Eamil" required value={email} onChange={onChange}>*/}
            {/*    </input>*/}
            {/*    <input name="password" type="password" placeholder="Eamil" required value={password}onChange={onChange}>*/}
            {/*    </input>*/}
            {/*    <Button*/}
            {/*        colorScheme='twitter'*/}
            {/*        type='submit'*/}
            {/*    >*/}
            {/*        {newAccount ? "Create Account" : "Login"}*/}
            {/*    </Button>*/}
            {/*    <Button colorScheme={"twitter"} onClick={toggleAccount}> {newAccount ? "Login" : "Join in" } </Button>*/}
            {/*</form>*/}


        </div>

    )
}
export default AuthForm