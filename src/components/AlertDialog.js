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
import React, {useState} from "react";
import {getDownloadURL, ref, uploadString} from "firebase/storage";
import {dbService, storageRef} from "../fbase";

const UpdateAlertDialog=({isOpen, cancelRef, onClose ,value ,onChange, onSubmit, onDeleteClick, State, CharValue, onCharValueChange})=>{
    const [attachment, setAttachment] = useState('')

    // const datamapRef = doc(dbService, "payment", datamap?.id);
    const onFileChange = (e) =>{
        const {target:{files}} = e;
        const theFile = files[0];
        //using file reader API
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget : {result}} = finishedEvent
            setAttachment(result);
        }
        reader.readAsDataURL(theFile)
    }
    const _onSubmit = async (e)=>{
        e.preventDefault();
        let attachmentUrl = "";
        if(attachment != ""){
            const filename = 'test'
            const testRef = ref(storageRef,filename)
            const upload_result = await uploadString(testRef,attachment,'data_url')
            attachmentUrl =  await getDownloadURL(upload_result.ref)
            onSubmit(e, attachmentUrl)
        }else{
            onSubmit(e);
        }
    }
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
                                <Input value={CharValue} onChange={onCharValueChange}></Input><Text>Image</Text><Input type={"file"} accept={"image/*"} onChange={onFileChange}/></>) : (<></>)
                            }
                            <Text>Value</Text>
                            <Input type={'number'} value={value} onChange={onChange}></Input>
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button colorScheme='twitter' onClick={_onSubmit} >
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