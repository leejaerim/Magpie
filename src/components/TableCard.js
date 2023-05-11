import {Text, Input, Box, Button, Heading, HStack, Image, Card, Stack, CardBody, CardFooter, VStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";

const TableCard = ({index, menu_name, menu_price, sum, sub, count, countPlus, countMinus, attachurl}) => {
    const price = menu_price;
    const UpCount = (e) => {
        sum(price)
        countPlus(index)
    }
    const DownCount = (e) => {
        if (count > 0) {
            sub(price)
            countMinus(index)
        }
    }
    //메뉴 이름, 수량, +, -
    return (
        <Card
            direction={{base: 'column', sm: 'row'}}
            overflow='hidden'
            variant='outline'
        >
                {/*{attachurl ? (*/}
                {/*    <Image*/}
                {/*        objectFit='cover'*/}
                {/*        maxW={{base: '30%', sm: '200px'}}*/}
                {/*        src={attachurl}*/}
                {/*        alt={menu_name}*/}
                {/*    />*/}
                {/*) : (<Image*/}
                {/*    objectFit='cover'*/}
                {/*    maxW={{base: '30%', sm: '200px'}}*/}
                {/*    src='/defaultBox.png'*/}
                {/*    alt={menu_name}*/}
                {/*/>)}*/}
                <VStack>
                    <HStack mb={"-10px;"}>
                        <Heading size='md'>{menu_name}</Heading>
                        <Text py='2'>
                            단가 : {menu_price} 원
                        </Text>
                    </HStack>
                        <HStack>
                            <Input w={'50%'} value={menu_price * count}/>
                            <Button color={'black'}>{count}</Button>
                            <Button colorScheme='red' onClick={UpCount}>+</Button>
                            <Button colorScheme='blue' onClick={DownCount}>-</Button>
                        </HStack>
                </VStack>
        </Card>
    )
}
export default TableCard;