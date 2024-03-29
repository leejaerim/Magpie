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
import {
    getDocs,
    deleteDoc,
    collection,
    doc,
    query,
    updateDoc,
    where,
    orderBy
} from "firebase/firestore";
import {dbService} from "../fbase";
import Pagination from "../components/Pagination";


const Payment = () => {
    const [dataMap, setDataMap] = useState([])
    const [totalDataMap, setTotalDataMap] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paymentRef, setPaymentRef] = useState(null)
    const [sumPrice, setSumPrice] = useState(0);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const cancelRef = useRef()
    // const [dataMap, setDataMap] = useState([])
    const [value, setValue] = useState(0)
    let dateTime = new Date();
    dateTime.setHours(dateTime.getHours() + 9);
    dateTime = dateTime.toISOString().replace('T', ' ').substring(0, 19);
    const [date, setDate] = useState(dateTime.split(' ')[0])
    const documentsPerPage = 5;
    // const { isLoading, data:dataMap_ ,refetch} = useQuery([`payment`,date], getPayment);
    const onDeleteClick = async (e) => {
        const confirm_ok = window.confirm("delete this?");
        if (confirm_ok) {
            await deleteDoc(paymentRef);
        }
        onClose();
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(paymentRef, {value: parseInt(value)});
        onClose()
    }
    const onChange = (e) => {
        const {
            target: {value},
        } = e;
        setValue(prev => value)
    }
    const countDocuments = async () => {
        const q = query(
            collection(dbService, 'payment'),
            where('date', '>=', date + ' 00:00:00'),
            where('date', '<=', date + ' 23:59:59'),
            orderBy("date")
        );
        const snapshot = await getDocs(q);
        setTotalDataMap(prev => snapshot.docs);
        snapshot.docs.map(i => (setSumPrice(prev => prev += i.data().value)));
        setDataMap(snapshot.docs.slice(0, documentsPerPage))
    };
    const getDocuents = async (index) => {
        setCurrentPage(prev => index)
    }
    const orderObject = {}
    if (totalDataMap.length != 0) {
        const orderList = totalDataMap.map(i => i.data().order)
        orderList.forEach(i => {
            if(i){
                Object.keys(i).map(j => {
                    if (orderObject[i[j].menu]) {
                        orderObject[i[j].menu]['cnt'] += i[j].count
                    } else {
                        orderObject[i[j].menu] = {'cnt': i[j].count, 'price': i[j].price}
                    }
                })
            }
        })
    }
    useEffect(() => {
        if (date != null) {
            countDocuments();
            setSumPrice(0)
            setCurrentPage(1)
        }
    }, [date,])
    useEffect(() => {
        setDataMap(totalDataMap.slice((currentPage - 1) * documentsPerPage, currentPage * documentsPerPage))
    }, [currentPage])
    return (
        <Box>
            <input value={date} type="date" onChange={(e) => {
                const {
                    target: {value},
                } = e;
                setDate(prev => value)
            }}/>
            <Button onClick={(e) => {
                e.preventDefault();
                setDate(prev => {
                    let temp_date = new Date(prev)
                    temp_date.setDate(temp_date.getDate() - 1);
                    return temp_date.toISOString().substring(0, 10);
                });
            }} colorScheme={"twitter"} ml={"2"}><FaArrowLeft id={"Left"} color={"#fff"}></FaArrowLeft></Button>
            <Button colorScheme={"twitter"} ml={"2"} onClick={(e) => {
                e.preventDefault();
                setDate(dateTime.split(' ')[0]);
            }}>Today</Button>
            <Button onClick={(e) => {
                e.preventDefault();
                setDate(prev => {
                    let temp_date = new Date(prev)
                    temp_date.setDate(temp_date.getDate() + 1);
                    return temp_date.toISOString().substring(0, 10);
                });
            }} colorScheme={"twitter"} ml={"2"}><FaArrowRight id={"Right"} color={"#fff"}></FaArrowRight></Button>

            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>{date} 매출 내역</TableCaption>
                    <Thead>
                        <Tr>
                            {/*{!isLoading && dataMap?.row.length != 0  && Object.keys(dataMap?.row[0]).map(key=> (*/}
                            {/*        (key!='payment_id') &&<Td>{key}</Td>*/}
                            {/*))}*/}
                            {dataMap.length != 0 && Object.keys(dataMap[0].data()).map(datamap => (
                                <Td key={datamap}>{datamap}</Td>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {dataMap.length != 0 && dataMap.map(datamap => {
                            return (
                                <Tr onClick={(e) => {
                                    setPaymentRef(prev => doc(dbService, "payment", e.target.dataset.id));
                                    setValue(datamap.data().value)
                                    // setValue(datamap.value)
                                    onOpen();
                                }}>
                                    <Td data-id={datamap.id}>{datamap.data().date}</Td>
                                    <Td data-id={datamap.id}>{datamap.data().value}</Td>
                                    <Td>
                                        {datamap.data().order && Object.keys(datamap.data().order).map(i => {
                                            return (<div
                                                data-id={datamap.id}>{datamap.data().order[i].menu} : {datamap.data().order[i].count}</div>)
                                        })}
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>메뉴</Th>
                            <Th>수량</Th>
                            <Th>정산</Th>
                        </Tr>
                        {totalDataMap.length != 0 && Object.keys(orderObject).map(i => (
                            <Tr>
                                <Th>{i}</Th>
                                <Th>{orderObject[i]['cnt']}</Th>
                                <Th>{orderObject[i]['price'] * orderObject[i]['cnt']}</Th>
                            </Tr>
                        ))}
                        <Tr>
                            <Th>총 합계</Th>
                            <Th>{sumPrice}</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
            {totalDataMap.length != 0 && <Pagination total={totalDataMap.length} limit={documentsPerPage}
                                                     change_page={getDocuents} page={currentPage}></Pagination>}
            <UpdateAlertDialog isOpen={isOpen} cancelRef={cancelRef} onClose={onClose} value={value}
                               onChange={onChange} onSubmit={onSubmit} onDeleteClick={onDeleteClick}/>
        </Box>
    )

}
    export default Payment