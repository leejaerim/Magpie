import {Box, HStack, Text} from "@chakra-ui/react";
import {addDoc, collection, doc, onSnapshot, query, where} from "firebase/firestore";
import {dbService} from "../fbase";
import {useOutletContext} from "react-router-dom";
import {useState} from "react";

const Payment =()=>{
    const [dataMap, setDataMap] = useState([])
    const dateTime = new Date()
    onSnapshot(query(collection(dbService, "payment"), where("date", "==", `${dateTime.getFullYear()}-${dateTime.getMonth()}-${dateTime.getDate()}`)), async obj => {
        if(obj.docs.length != 0){
            setDataMap(prev => obj.docs)
        }
    })
    return(
        <Box>
            {dataMap.length != 0 && dataMap.map(datamap=>(
                <HStack>
                    <Text>{datamap.data().date}</Text>
                    <Text>{datamap.data().value}</Text>
                </HStack>
            ))}
        </Box>
    )

}
export default Payment