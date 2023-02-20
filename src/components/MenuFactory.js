import {
    HStack,
    FormControl,
    FormLabel,
    Input,
    FormHelperText, FormErrorMessage, Button
} from "@chakra-ui/react";
import {useState} from "react";
import {addDoc, collection } from "firebase/firestore";
import {dbService} from "../fbase";

const MenuFactory =_=>{
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)

    const handleNameChange = (e) => setName(e.target.value)
    const handleCountChange = (e) => setPrice(e.target.value)

    const isNameError = name === ''
    const isPriceError = price === 0

    const onSubmit =async (e)=>{
        e.preventDefault();
        const menu_target = {
            menuName: name,
            menuPrice: price,
            createAt: Date.now(),
        }
        try {
            const docRef = await addDoc(collection(dbService, "menu"), menu_target)
        } catch (e) {
        }
    }
    return (
     <HStack>
         <form onSubmit={onSubmit}>
             <FormControl >
                 <FormLabel>Name</FormLabel>
                 <Input type='text' value={name} onChange={handleNameChange} />
                 {!isNameError ? (
                     <FormHelperText>
                         Enter the name of Menu you'd like to register.
                     </FormHelperText>
                 ) : (
                     <FormErrorMessage>Menu Name is required.</FormErrorMessage>
                 )}
                 <FormLabel>Price</FormLabel>
                 <Input type='number' value={price} onChange={handleCountChange} />
                 {!isPriceError ? (
                     <FormHelperText>
                         Enter the price of menu you'd like to register.
                     </FormHelperText>
                 ) : (
                     <FormErrorMessage>Price is required.</FormErrorMessage>
                 )}
                 <Button
                     mt={4}
                     colorScheme='twitter'
                     type='submit'
                 >
                     Submit
                 </Button>
             </FormControl>
         </form>
     </HStack>
    )
}
export default MenuFactory