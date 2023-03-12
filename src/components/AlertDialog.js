import {
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button, Input,
    Td,
    Tr,
    AlertDialog
} from "@chakra-ui/react";

const MagpieAlertDialog=({isOpen, cancelRef, onClose ,value ,onChange, onSubmit, onDeleteClick })=>{
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
                            update value
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <Input type={'number'} value={value} onChange={onChange}></Input>
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='twitter' onClick={onSubmit} ml={3}>
                                Update
                            </Button>
                            <Button colorScheme='red' onClick={onDeleteClick} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    )
}
export default MagpieAlertDialog