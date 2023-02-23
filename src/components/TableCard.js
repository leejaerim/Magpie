import {Input,Text,  Box, Button, Heading, HStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";

const TableCard = ({index, menu_name,menu_price, sum, sub, count, countPlus, countMinus})=>{
    const price = menu_price;
    const UpCount =(e)=>{
        sum(price)
        countPlus(index)
    }
    const DownCount =(e)=>{
        if(count > 0 ){
            sub(price)
            countMinus(index)
        }
    }
    //메뉴 이름, 수량, +, -
    return(
        <Box>
            <Heading>{menu_name}</Heading>
            <HStack>
                <Text fontSize={'20px;'}  w={'50%'}>{menu_price*count}</Text>
                <Button color={'black'}>{count}</Button>
                <Button colorScheme='red' onClick={UpCount}>+</Button>
                <Button colorScheme='blue' onClick={DownCount}>-</Button>
            </HStack>
        </Box>
    )
}
export default TableCard;