import {Box, Button, Grid, GridItem} from '@chakra-ui/react'
import {Link, useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import {collection, limit, onSnapshot, orderBy, query} from "firebase/firestore";
import {dbService} from "../fbase";
import Table from "./Table";
import './table.css'

const TablePanel = _ => {
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
    }, [])
    const setIndex0 = _ => {
        setIndex(prev => -1);
    }
    const changeOrder = (arr, i1, i2) => {
        const item = arr.splice(i1, 1); // index1 요소를 잘라냄
        arr.splice(i2, 0, item[0]); // index2에 잘라낸 요소를 삽입
        return arr;
    }
    return (
        <Box>
            <Box className={index === -1 ? 'active' : 'none'}>

                <Box padding={"50px;"}>
                    <Box marginBottom={"50px;"} h="100px;" bg={'#1A94DA'} w='100%' p={4} color='white' display={"flex"} justifyContent={"center"} fontWeight={"bold"} alignItems={"center"} textAlign={"center"}>
                        주방
                    </Box>

                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                        {changeOrder([...Array(tableCount).keys()], 1, 2).map((i) => (
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
                            </Button>
                        ))}
                    </Grid>
                </Box>
            </Box>
            {[...Array(tableCount).keys()].map((i) => (
                <Table index={index} setIndex={setIndex0} table_index={i} table_price={table_price}></Table>
            ))}

        </Box>
    )
}
export default TablePanel