import {Button, HStack, Stack, Text, useTheme} from "@chakra-ui/react";
import React from "react";
import "./Pagination.css"
import {FaStepBackward, FaStepForward} from "react-icons/fa";
const Pagination =({total = 0, limit = 20, change_page, page = 1})=>{
    const theme = useTheme();
    var range = [...Array(parseInt(Math.ceil(total/limit)))].map((v,i) => i+1);
    const _onClick =({target})=>{
        change_page(parseInt(target.textContent))
    }
    const _goEnd=e=>{
        e.preventDefault();
        e.target.className.includes('backward')?change_page(1):change_page(range[range.length-1])
    }
    return(
        <Stack className={"Pagination"} spacing={4} direction='row'>
            <Button className={"backward"} onClick={_goEnd}> <FaStepBackward pointerEvents={"none"}></FaStepBackward> </Button>
            {range.map((index)=>(
                Math.abs(index - page) <= 2.5  && <Button className={ page == index ? "active":""} key={index} onClick={_onClick}>{index}</Button>
                //size='xs' backgroundColor={theme.extend_Theme.colors.main} color={theme.colors.white}
            ))}
            <Button className={"forward"} onClick={_goEnd}> <FaStepForward pointerEvents={"none"}></FaStepForward> </Button>
        </Stack>
    )
}

export default Pagination