import {Text, Box, Button, Heading, HStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";

const TableCard = ({menu_name,menu_price, sum, sub, init})=>{

    const [count, SetCount] = useState(init);
    const price = menu_price;
    const UpCount =(e)=>{
        sum(price)
        SetCount(prev => prev+1)
    }
    const DownCount =(e)=>{
        if(count > 0 ){
            sub(price)
            SetCount(prev => prev-1)
        }
    }
    //메뉴 이름, 수량, +, -
    return(
        <HStack>
            <Heading>{menu_name}</Heading>
            <Text>{menu_price * count}</Text>
            <Button color={'black'}>{count}</Button>
            <Button colorScheme='red' onClick={UpCount}>+</Button>
            <Button colorScheme='blue' onClick={DownCount}>-</Button>
        </HStack>
    )
}
export default TableCard;