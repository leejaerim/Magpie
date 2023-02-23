import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Table from "./Table";
import {useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import {collection, limit, onSnapshot, orderBy, query} from "firebase/firestore";
import {dbService} from "../fbase";

const HomeTab = ()=>{
    const [table_price] = useOutletContext();
    const [tableCount, setTableCount] = useState(0);
    useEffect(() => {
        //getNweets();
        onSnapshot(query(
            collection(dbService, "table"),
            orderBy("createAt", "desc"),
            limit(1)
        ), obj => {
            setTableCount(obj.docs[0].data().number_of_table);
        })
    },[])
    return(
        <Tabs  isFitted variant='enclosed' variant='soft-rounded' colorScheme='blue'>
            <TabList>
                {[ ...Array(tableCount).keys()].map( i =>(
                    <Tab key={i}>{i+1}</Tab>
                ))}
            </TabList>
            <TabPanels>
                {[ ...Array(tableCount).keys()].map( i =>(
                    <TabPanel key={i}>
                        <Table index={i} table_price={table_price}></Table>
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    )
}

export default HomeTab;