import {
    Box,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Tfoot,
    Th,
    Thead,
    Tr,
    Td,
    Button, useDisclosure
} from "@chakra-ui/react";
import { deleteDoc, collection, doc, onSnapshot, query, updateDoc, where} from "firebase/firestore";
import {dbService} from "../fbase";
import {useEffect, useRef, useState} from "react";
import UpdateAlertDialog from "../components/AlertDialog";

const Payment =()=>{
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const [dataMap, setDataMap] = useState([])
    const [paymentRef, setPaymentRef] = useState(null)
    const [value, setValue] = useState(0)
    let dateTime = new Date();
    dateTime.setHours(dateTime.getHours() + 9);
    dateTime = dateTime.toISOString().replace('T', ' ').substring(0, 19);
    const [date, setDate] = useState(dateTime.split(' ')[0])
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
    useEffect(() => {
        if(date != null){
            onSnapshot(query(collection(dbService, "payment"), where("date", ">=", date)), async obj => {
                if(obj.docs.length != 0){
                    setDataMap(prev => obj.docs)
                }else{
                    setDataMap([])
                }
            })
        }
    },[date,])

    return(
        <Box>
            <input value={date} style={{paddingLeft : '100px;'}} type="date" onChange={(e)=>{
                const {
                    target: { value },
                } = e;
                setDate(prev => value)
            }}/>
            <Button colorScheme={"twitter"} ml={"5"} onClick={(e)=>{
                e.preventDefault();
                setDate(dateTime.split(' ')[0]);
            }}>Today</Button>
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
                                <Tr onClick={(e)=>{
                                        setPaymentRef(prev=>doc(dbService, "payment", e.target.dataset.id));
                                        setValue(datamap.data().value)
                                        onOpen();
                                }}>
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
            <UpdateAlertDialog isOpen={isOpen} cancelRef={cancelRef} onClose={onClose} value={value}
                               onChange={onChange} onSubmit={onSubmit} onDeleteClick={onDeleteClick}/>
        </Box>
    )

}
export default Payment