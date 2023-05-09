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
import {useEffect, useRef, useState} from "react";
import UpdateAlertDialog from "../components/AlertDialog";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {useQuery} from "@tanstack/react-query";
import {getPayment} from "../api/api_payment.js";
import { deleteDoc, collection, doc, onSnapshot, query, updateDoc, where} from "firebase/firestore";
import {dbService} from "../fbase";


const Payment =()=>{
    const [dataMap, setDataMap] = useState([])
    const [paymentRef, setPaymentRef] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef()
    // const [dataMap, setDataMap] = useState([])
    const [value, setValue] = useState(0)
    let dateTime = new Date();
    dateTime.setHours(dateTime.getHours() + 9);
    dateTime = dateTime.toISOString().replace('T', ' ').substring(0, 19);
    const [date, setDate] = useState(dateTime.split(' ')[0])
    const { isLoading, data:dataMap_ ,refetch} = useQuery([`payment`,date], getPayment);
    const onDeleteClick = async (e) => {
        const confirm_ok = window.confirm("delete this?");
        if (confirm_ok) {
            await deleteDoc(paymentRef);
        }
        onClose();
    }
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
    let sumPrice = 0;
    useEffect(() => {
        if(date != null){
            // refetch()
            onSnapshot(query(collection(dbService, "payment"),where("date", ">=", date+" 00:00:00"), where("date", "<=", date+" 23:59:59")), async obj => {
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
            <Button  onClick={(e)=>{
                e.preventDefault();
                setDate(prev=>{
                    let temp_date = new Date(prev)
                    temp_date.setDate(temp_date.getDate() - 1);
                    return temp_date.toISOString().substring(0, 10);
                });
            }} colorScheme={"twitter"} ml={"2"}><FaArrowLeft id={"Left"} color={"#fff"}></FaArrowLeft></Button>
            <Button colorScheme={"twitter"} ml={"2"} onClick={(e)=>{
                e.preventDefault();
                setDate(dateTime.split(' ')[0]);
            }}>Today</Button>
            <Button  onClick={(e)=>{
                e.preventDefault();
                setDate(prev=>{
                    let temp_date = new Date(prev)
                    temp_date.setDate(temp_date.getDate() + 1);
                    return temp_date.toISOString().substring(0, 10);
                });
            }}colorScheme={"twitter"} ml={"2"}><FaArrowRight id={"Right"} color={"#fff"}></FaArrowRight></Button>

            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>{date} 매출 내역</TableCaption>
                    <Thead>
                        <Tr>
                            {/*{!isLoading && dataMap?.row.length != 0  && Object.keys(dataMap?.row[0]).map(key=> (*/}
                            {/*        (key!='payment_id') &&<Td>{key}</Td>*/}
                            {/*))}*/}
                            {dataMap.length != 0 && Object.keys(dataMap[0].data()).map(datamap=> (
                                <Td>{datamap}</Td>
                            ))}
                        </Tr>
                    </Thead>
                        {/*{!isLoading && dataMap?.row.length != 0 && dataMap?.row.map(datamap=>{*/}
                        {/*    sumPrice += datamap.value*/}
                        {dataMap.length != 0 && dataMap.map(datamap=>{
                            sumPrice += datamap.data().value
                            return(
                                <Tbody>
                                <Tr onClick={(e)=>{
                                        setPaymentRef(prev=>doc(dbService, "payment", e.target.dataset.id));
                                        setValue(datamap.data().value)
                                        // setValue(datamap.value)
                                        onOpen();
                                }}>
                                    <Td data-id={datamap.id}>{datamap.data().date}</Td>
                                    <Td data-id={datamap.id}>{datamap.data().value}</Td>
                                    {/*<Td data-id={datamap.payment_id}>{datamap.reg_date}</Td>*/}
                                    {/*<Td data-id={datamap.payment_id}>{datamap.value}</Td>*/}
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