import React, {useState} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {AuthService} from "../fbase";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay, Box,
    Button, HStack, Input, InputGroup, InputLeftElement, Text, useDisclosure
} from "@chakra-ui/react";
import { FaUserAlt, FaLock} from "react-icons/fa";

const AuthForm =()=>{
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [error, setError] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [repassword , setRepassword] = useState("");
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
        }else if(name === "repassword"){
            setRepassword(value)
        }
    }
    const onSubmit =async (e)=>{
        e.preventDefault();
        try{
            let data;
            if(newAccount){
                if(password === repassword) {
                    data = await createUserWithEmailAndPassword(AuthService, email, password);
                }else{
                    alert("Not same password")
                }
                //create Account
            }else{
                //login
                data = await signInWithEmailAndPassword(AuthService,email,password);
            }
            console.log(data)
        }catch(e){
            setError(e.message);
        }

    }
    const _onOpen=(e)=>{
        const {target : {name}} = e;
        if(name === 'login'){
            setNewAccount(false)
        }else{
            setNewAccount(true)
        }
        onOpen();
    }
    return (
        <div style={{marginTop:"10px",display:'flex',justifyContent:'center'}}>
            <Button mr={'10px;'} name={'login'} colorScheme='red' onClick={_onOpen}>
                Login
            </Button>
            <Button colorScheme='red' onClick={_onOpen}>
                Join
            </Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            {newAccount? 'Join' : 'Login'}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <InputGroup>
                                <InputLeftElement
                                    children={
                                        <Box color="gray.400">
                                            <FaUserAlt />
                                        </Box>
                                    }
                                />
                                <Input name={"email"} type={'email'} value={email} placeholder={"Email"} onChange={onChange} required onKeyDown={(e)=>{if(e.keyCode == 13) onSubmit(e)}}></Input>
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement
                                    children={
                                        <Box color="gray.400">
                                            <FaLock />
                                        </Box>
                                    }
                                />
                                <Input name={"password"} type={'password'} value={password} placeholder={"Password"} onChange={onChange} required onKeyDown={(e)=>{if(e.keyCode == 13) onSubmit(e)}}></Input>
                            </InputGroup>
                            {newAccount? <Input name={"repassword"} type={'password'} value={repassword} placeholder={"re-Password"} onChange={onChange} required></Input>:''}
                            {error}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onSubmit}>
                                {newAccount? 'Create Account' : 'Login'}
                            </Button>
                            <Button colorScheme='red' ref={cancelRef}  onClick={onClose} ml={3}>
                                Cancel
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </div>

    )
}
export default AuthForm