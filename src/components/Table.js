import TableCard from "./TableCard";
import {Box, Button, Divider, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {collection, onSnapshot} from "firebase/firestore";
import {dbService} from "../fbase";

const Table =({table_price})=> {
    const [menus, setMenus] = useState([]);
    const [count, setCount] = useState([]);
    useEffect(() => {
        //getNweets();
        onSnapshot(collection(dbService, "menu"), obj => {
            setMenus(obj.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })));
            setCount(prev=>[ ...Array(obj.docs.length).keys() ].map( i => 0))
        })


    }, []);

    const menu_list = [{menu_name: '김치찌개', menu_price: 8000,}, {menu_name: '계란말이', menu_price: 5000,}, {
        menu_name: '소주/맥주',
        menu_price: 4000,
    }, {menu_name: '음료수', menu_price: 2000,}, {menu_name: '기타', menu_price: 1000,}]

    const [totalPrice , setTotalPrice] = useState(0)
    const SumPrice =(price)=>{
        setTotalPrice(prev => prev + price)
    }
    const SubPrice =(price)=>{
        setTotalPrice(prev => prev - price)
    }

    const payment=()=>{
        table_price(totalPrice)
        setTotalPrice(0)
        setCount(prev=>[ ...Array(prev.length).keys() ].map( i => 0))
    }
    const countPlus=(index)=>{
        count[index]+=1
        setCount(count)
    }
    const countMinus=(index)=>{
        count[index]-=1
        setCount(count)
    }
    return (
        <Box>
            {menus.map((menu, index)=>(
                <TableCard key={index} index={index} sum={SumPrice} sub={SubPrice} menu_name={menu.menuName} menu_price={parseInt(menu.menuPrice)} countPlus={countPlus} count={count[index]} countMinus={countMinus}></TableCard>
            ))}
            <Divider mt={5} mb={5} orientation='horizontal' />
            <Button colorScheme='red' onClick={payment}>정산</Button>
            <Text fontWeight={'bold'} fontSize={'30px;'} mt={'10px;'}>합계 : {totalPrice}</Text>
        </Box>
    )
}
export default Table