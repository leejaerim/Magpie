
import {FaReact} from "react-icons/fa";
import {Box, HStack, VStack, Text, Stack, Button} from "@chakra-ui/react";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthService} from "../fbase";
export default function Header({table_sum}) {
    const date = new Date();
    const [paymentPage,setPaymentPage] = useState(false);
    const daydict = {0:'일',1:'월',2:'화',3:'수',4:'목',5:'금',6:'토'}
    const dateText = `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일 ${daydict[date.getDay()]}요일`
    const navi = useNavigate();
    const onLogoutClick=_=>{
        AuthService.signOut();
        navi("/");
    }
    return(
        <Box>
            <Stack
                justifyContent={"space-between"}
                px={"30"}
                py={"10"}
                borderBottomWidth={1}
                alignItems="center"
                direction={{
                    sm: "column",
                    md: "row",
                }}
                spacing={{
                    sm: 3,
                    md: 0,
                }}
            >
                <VStack fontSize={30} fontWeight={'bold'}>
                    <HStack>
                    <FaReact size={"38"} style={{paddingRight:10}}/>
                    <Text _hover={{ cursor:'pointer' }}>
                        MagpieTown
                    </Text>
                    </HStack>
                    <Text>{dateText}</Text>
                    <Text> 테이블 합계 : {table_sum}</Text>
                    <HStack>
                        {paymentPage && <Link to={'admin'} onClick={()=>{
                            setPaymentPage(prev=>!prev)
                        }}>
                            <Button colorScheme={'twitter'}>{'관리자'}</Button>
                        </Link>}
                        <Link to={paymentPage? '/':'payment'} onClick={()=>{
                            setPaymentPage(prev=>!prev)
                        }}>
                            <Button colorScheme={'twitter'}>{paymentPage?'테이블':'결제'}</Button>
                        </Link>
                        <Button colorScheme={'twitter'} onClick={onLogoutClick}>로그아웃</Button>
                    </HStack>
                </VStack>

            </Stack>
        </Box>
    )
}