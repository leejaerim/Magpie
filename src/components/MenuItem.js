import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Image,
    Heading,
    Stack,
    Text,
    Box, useDisclosure
} from "@chakra-ui/react";
import UpdateAlertDialog from "./AlertDialog";
import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import {dbService} from "../fbase";
import {useRef, useState} from "react";

const MenuItem=({data})=>{
    const menuRef = doc(dbService, "menu", data.id);
    const [value, setValue] = useState(data.menuPrice);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();

    const onSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(menuRef, { value: parseInt(value)});
        onClose();
    }
    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setValue(prev => value)
    }
    const onDeleteClick = async (e) => {
        const confirm_ok = window.confirm("delete this?");
        if (confirm_ok) {
            await deleteDoc(menuRef);
        }
        onClose();
    }
    return (
        <>
        {data !== null ? (<Card maxW='sm'>
            <CardBody>
                <Image
                    src='/defaultBox.png'
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{data.menuName}</Heading>
                    <Text color='blue.600' fontSize='2xl'>
                        ₩ {data.menuPrice}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='twitter' onClick={(e)=>{onOpen();}}>
                        Update
                    </Button>
                    <Button variant='solid' colorScheme='red' color={'twitter.50'} onClick={onDeleteClick}>
                        delete
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>) : (<></>)}
        <UpdateAlertDialog value={value} cancelRef={cancelRef} isOpen={isOpen} onChange={onChange} onDeleteClick={onDeleteClick} onClose={onClose} onSubmit={onSubmit}></UpdateAlertDialog>
        </>

    )
}
export default MenuItem