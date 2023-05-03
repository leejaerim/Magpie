import {Box, Button, Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {postPayment} from "../api/api_fileupload";
import {FaImage} from "react-icons/fa";
import {useState} from "react";

const FileUpload =_=>{
    const [file, setFile] = useState(null);
    const onFileChangebyfastapi = (e) =>{
        const {target:{files}} = e;
        const theFile = files[0];
        setFile(theFile);
    }
    const submit=e=>{
        e.preventDefault();
        if(file == null) return
        const formData = new FormData();
        formData.append('file', file);
        postPayment(formData)
    }
    return (
        <Box>
            <InputGroup>
            <InputLeftElement
                children={
                    <Box color="gray.400">
                        <FaImage />
                    </Box>
                }
            />
            <Input type={"file"} accept={"image/*"} onChange={onFileChangebyfastapi} placeholder={"이미지"}/>
            <Button colorScheme='twitter' onClick={submit}>
                File Upload
            </Button>
            </InputGroup>
        </Box>
    )
}

export default FileUpload