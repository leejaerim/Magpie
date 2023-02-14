
import {FaReact} from "react-icons/fa";
import {HStack, Text, Stack} from "@chakra-ui/react";
import React from "react";
export default function Header({table_sum}) {
    return(
        <Stack
            justifyContent={"space-between"}
            px={"40"}
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
            <HStack fontSize={50} fontWeight={'bold'}>\
                <FaReact size={"38"} style={{paddingRight:10}}/>
                <Text _hover={{ cursor:'pointer' }}>
                    FED
                </Text>
                <Text> 테이블 합계 : {table_sum}</Text>
            </HStack>
        </Stack>
    )
}