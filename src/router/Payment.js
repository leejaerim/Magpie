import {
    Box,
    HStack,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
    Td,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
    useDisclosure,
    AlertDialog, Input
} from "@chakra-ui/react";
import {addDoc, deleteDoc, collection, doc, onSnapshot, query, updateDoc, where} from "firebase/firestore";
import {dbService} from "../fbase";
import {useOutletContext} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

const Payment =()=>{
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const [dataMap, setDataMap] = useState([])
    const [paymentRef, setPaymentRef] = useState(null)
    const [value, setValue] = useState(0)
    const onSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(paymentRef, { value: parseInt(value)});
        onClose()
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
            await deleteDoc(paymentRef);
        }
        onClose();
    }
    let sumPrice = 0;
    let dateTime = new Date();
    dateTime.setHours(dateTime.getHours() + 9);
    dateTime = dateTime.toISOString().replace('T', ' ').substring(0, 19);
    useEffect(() => {
        onSnapshot(query(collection(dbService, "payment"), where("date", ">=", dateTime.split(' ')[0])), async obj => {
            if(obj.docs.length != 0){
                setDataMap(prev => obj.docs)
            }else{
                setDataMap([])
            }
        })
    },[])

    return(
        <Box>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>{dateTime.split(' ')[0]} 매출 내역</TableCaption>
                    <Thead>
                        <Tr>
                            {dataMap.length != 0 && Object.keys(dataMap[0].data()).map(datamap=> (
                                        <Td>{datamap}</Td>
                            ))}
                        </Tr>
                    </Thead>

                        {dataMap.length != 0 && dataMap.map(datamap=>{
                            sumPrice += datamap.data().value
                            return(
                                <Tbody>
                                <Tr onClick={(e)=>{setPaymentRef(prev=>doc(dbService, "payment", e.target.dataset.id));onOpen();}}>
                                    <Td data-id={datamap.id}>{datamap.data().date}</Td>
                                    <Td data-id={datamap.id}>{datamap.data().value}</Td>
                                </Tr>
                            </Tbody>
                            )
                        })}
                    <Tfoot>
                        <Tr>
                            <Th>합계</Th>
                            <Th>{sumPrice}</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            update value
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <Input type={'number'} value={value} onChange={onChange}></Input>
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='twitter' onClick={onSubmit} ml={3}>
                                Update
                            </Button>
                            <Button colorScheme='red' onClick={onDeleteClick} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    )

}
export default Payment