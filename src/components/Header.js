
import {FaReact} from "react-icons/fa";
import {Box, HStack,VStack, Text, Stack} from "@chakra-ui/react";
import React from "react";
import AuthForm from "./AuthForm";
export default function Header({table_sum}) {
    const date = new Date()
    const daydict = {0:'일',1:'월',2:'화',3:'수',4:'목',5:'금',6:'토'}
    const dateText = `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일 ${daydict[date.getDay()]}요일`
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
            </VStack>
        </Stack>
        {/*<AuthForm></AuthForm>*/}
        </Box>
    )
}