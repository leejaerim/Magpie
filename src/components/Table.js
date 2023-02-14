import TableCard from "./TableCard";
import {Box, Button, Text} from "@chakra-ui/react";
import {useState} from "react";

const Table =({table_price})=> {
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
    const setInit=()=>{

    }
    const payment=()=>{
        table_price(totalPrice)
        setTotalPrice(0)
    }
    console.log(0)
    return (
        <Box>
            {menu_list.map(menu=>(
                <TableCard key={menu.menu_name} sum={SumPrice} sub={SubPrice} menu_name={menu.menu_name} menu_price={menu.menu_price} init={0}></TableCard>
            ))}
            <Button colorScheme='red' onClick={payment}>정산</Button>
            <Text fontSize={'30px;'} mt={'10px;'}>합계 : {totalPrice}</Text>
        </Box>
    )
}
export default Table