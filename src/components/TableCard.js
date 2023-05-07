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
            <HStack>
                {attachurl ? (
                    <Image
                        objectFit='cover'
                        maxW={{base: '30%', sm: '200px'}}
                        src={attachurl}
                        alt={menu_name}
                    />
                ) : (<Image
                    objectFit='cover'
                    maxW={{base: '30%', sm: '200px'}}
                    src='/defaultBox.png'
                    alt={menu_name}
                />)}
                <VStack>
                    <CardBody>
                        <Heading size='md'>{menu_name}</Heading>
                        <Text py='2'>
                            단가 : {menu_price} 원
                        </Text>
                    </CardBody>
                    <CardFooter>
                        <HStack>
                            <Input w={'50%'} value={menu_price * count}/>
                            <Button color={'black'}>{count}</Button>
                            <Button colorScheme='red' onClick={UpCount}>+</Button>
                            <Button colorScheme='blue' onClick={DownCount}>-</Button>
                        </HStack>
                    </CardFooter>
                </VStack>
            </HStack>
        </Card>
    )
}
export default TableCard;