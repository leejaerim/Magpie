import {Button, HStack, Input, useNumberInput} from "@chakra-ui/react";

const NumberInput=({Count, CountChange})=>{
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: Count,
            min: 1,
            max: 30,
            precision: 0,
            onChange : CountChange
        })
    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()


    return (
        <HStack maxW='320px'>
            <Button {...inc}>+</Button>
            <Input {...input} />
            <Button {...dec}>-</Button>
        </HStack>
    )
}
export default NumberInput;