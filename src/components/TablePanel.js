import {Box, Button, Grid} from '@chakra-ui/react'
import {Link, useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import {collection, limit, onSnapshot, orderBy, query} from "firebase/firestore";
import {dbService} from "../fbase";
import Table from "./Table";
import './table.css'
const TablePanel = _ =>{
    const [table_price] = useOutletContext();
    const [tableCount, setTableCount] = useState(0);
    const [index, setIndex] = useState(-1);
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
    const setIndex0 =_=>{
        setIndex(prev=>-1);
    }
    return(
        <Box>
            <Box className={index === -1 ? 'active':'none'}>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    {[...Array(tableCount).keys()].map((i) => (
                            <Button
                                key={i+1}
                                index={i+1}
                                colorScheme="twitter"
                                height="80px"
                                onClick={(e)=>{setIndex(prev=>parseInt(e.target.getAttribute('index')))}}
                            >
                                {i+1}
                            </Button>
                    ))}
                </Grid>
            </Box>
            {[...Array(tableCount).keys()].map((i) => (
                <Table index={index} setIndex={setIndex0} table_index={i} table_price={table_price}></Table>
            ))}

        </Box>
    )
}
export default TablePanel