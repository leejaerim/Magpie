import {
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button, Input,
    Text,
    Td,
    Tr,
    AlertDialog
} from "@chakra-ui/react";
import React from "react";

const UpdateAlertDialog=({isOpen, cancelRef, onClose ,value ,onChange, onSubmit, onDeleteClick, State, CharValue, onCharValueChange})=>{
    // const datamapRef = doc(dbService, "payment", datamap?.id);
    return(
        <Box>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            {State && State == 'add' ? 'Add Item' : 'Update Value'}
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            {State && State == 'add' ? (
                                <>
                                <Text>CharValue</Text>
                                <Input value={CharValue} onChange={onCharValueChange}></Input></>) : (<></>)
                            }
                            Value
                            <Input type={'number'} value={value} onChange={onChange}></Input>
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button colorScheme='twitter' onClick={onSubmit} >
                                {State && State == 'add' ? 'Add Item' : 'Update Item'}
                            </Button>
                            {onDeleteClick && State != 'add' ? (
                                <Button colorScheme='red' onClick={onDeleteClick} ml={3}>
                                    Delete
                                </Button>):(<></>)
                            }
                            <Button ref={cancelRef} onClick={onClose} ml={3}>
                                Cancel
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    )
}
export default UpdateAlertDialog