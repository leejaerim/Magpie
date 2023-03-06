import {Box, HStack, Table, TableCaption, TableContainer, Tbody, Text, Tfoot, Th, Thead, Tr, Td} from "@chakra-ui/react";
import {addDoc, collection, doc, onSnapshot, query, where} from "firebase/firestore";
import {dbService} from "../fbase";
import {useOutletContext} from "react-router-dom";
import {useState} from "react";

const Payment =()=>{
    const [dataMap, setDataMap] = useState([])
    let sumPrice = 0;
    let dateTime = new Date();
    dateTime.setHours(dateTime.getHours() + 9);
    dateTime = dateTime.toISOString().replace('T', ' ').substring(0, 19);
    onSnapshot(query(collection(dbService, "payment"), where("date", ">=", dateTime.split(' ')[0])), async obj => {
        if(obj.docs.length != 0){
            setDataMap(prev => obj.docs)
        }
    })
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
                    <Tbody>
                        {dataMap.length != 0 && dataMap.map(datamap=>{
                            sumPrice += datamap.data().value
                            return(
                            <Tr>
                                <Td>{datamap.data().date}</Td>
                                <Td>{datamap.data().value}</Td>
                            </Tr>
                            )
                        })}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>합계</Th>
                            <Th>{sumPrice}</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>

        </Box>
    )

}
export default Payment