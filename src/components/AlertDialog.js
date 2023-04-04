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
    AlertDialog, InputLeftElement, InputGroup
} from "@chakra-ui/react";
import React, {useState} from "react";
import {getDownloadURL, ref, uploadString} from "firebase/storage";
import {dbService, storageRef} from "../fbase";
import {FaRegEdit, FaMoneyCheckAlt, FaImage} from "react-icons/fa";

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
                            {State && State == 'add' ? '메뉴 추가하기' : '메뉴 수정하기'}
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            {State && State == 'add' ? (
                                <>
                                    <InputGroup>
                                        <InputLeftElement
                                            children={
                                                <Box color="gray.400">
                                                    <FaRegEdit />
                                                </Box>
                                            }
                                        />
                                        <Input value={CharValue} onChange={onCharValueChange} placeholder={"이름"}></Input>
                                    </InputGroup>
                                </>) : (<></>)
                            }
                            <InputGroup>
                                <InputLeftElement
                                    children={
                                        <Box color="gray.400">
                                            <FaMoneyCheckAlt />
                                        </Box>
                                    }
                                />
                                <Input type={'number'} value={value} onChange={onChange} placeholder={"가격"}></Input>
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement
                                    children={
                                        <Box color="gray.400">
                                            <FaImage />
                                        </Box>
                                    }
                                />
                                <Input type={"file"} accept={"image/*"} onChange={onFileChange} placeholder={"이미지"}/>
                            </InputGroup>
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button colorScheme='twitter' onClick={_onSubmit} >
                                {State && State == 'add' ? '메뉴 추가' : '메뉴 수정'}
                            </Button>
                            {onDeleteClick && State != 'add' ? (
                                <Button colorScheme='red' onClick={onDeleteClick} ml={3}>
                                    삭제
                                </Button>):(<></>)
                            }
                            <Button ref={cancelRef} onClick={onClose} ml={3}>
                                취소
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    )
}
export default UpdateAlertDialog