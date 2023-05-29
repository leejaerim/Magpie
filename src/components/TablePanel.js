import {Box, Button, Grid, GridItem} from '@chakra-ui/react'
import {Link, useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import {collection, limit, onSnapshot, orderBy, query} from "firebase/firestore";
import {dbService} from "../fbase";
import Table from "./Table";
import './table.css'

const TablePanel = _ => {
    const [table_price] = useOutletContext();
    const [eachOfTablePrice,setEachOfTablePrice] = useState([]);
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
            setEachOfTablePrice(new Array(obj.docs[0].data().number_of_table).fill(0))
        })
    }, [])
    const setTablePrice = (idx, table_price)=>{
        setEachOfTablePrice(prev=>{
            prev[idx] = table_price;
            return prev
        })
    }
    const setIndex0 = _ => {
        setIndex(prev => -1);
    }
    const changeOrder = (arr) => {
        return [3, 1, 2, 0].map((i) => arr[i]);
    }
    return (
        <Box>
            <Box className={index === -1 ? 'active' : 'none'}>

                <Box padding={"50px;"}>
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                        {changeOrder([...Array(tableCount).keys()]).map((i) => (
                            <Button
                                key={i}
                                index={i}
                                colorScheme="twitter"
                                height="80px"
                                onClick={(e) => {
                                    setIndex(prev => parseInt(e.target.getAttribute('index')))
                                }}
                            >
                                {i + 1}
                                <br/>
                                {eachOfTablePrice.length != 0 && eachOfTablePrice[i]}

                            </Button>
                        ))}
                    </Grid>
                </Box>
            </Box>
            {[...Array(tableCount).keys()].map((i) => (
                <Table index={index} setIndex={setIndex0} table_index={i} table_price={table_price} setTablePrice={setTablePrice}></Table>
            ))}

        </Box>
    )
}
export default TablePanel