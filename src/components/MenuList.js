import {Box,Text} from "@chakra-ui/react";

const MenuList =({count, menus})=>{
    return (
        <Box fontWeight={"bold"}>
            {count.length != 0 && menus.length != 0 && [...Array(4).keys()].map(i=>{
                return (
                    count[i] != 0 && <Text>{menus[i].menuName} : {count[i]} 개</Text>
                )
            })}
        </Box>

    )
}
export default MenuList