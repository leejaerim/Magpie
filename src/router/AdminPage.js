import {Text, Box, HStack, Heading, Grid, Divider, Button, useDisclosure} from "@chakra-ui/react";
import NumberInput from "../components/NumberInput";
import {useEffect, useRef, useState} from "react";
import {addDoc, collection, onSnapshot, query, orderBy, limit} from "firebase/firestore";
import {dbService} from "../fbase";
import MenuFactory from "../components/MenuFactory";
import MenuItem from "../components/MenuItem";
import UpdateAlertDialog from "../components/AlertDialog";
const AdminPage =()=>{
    const [tableCount, setTableCount] = useState(0);
    const [menu, setMenu] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [seq, setSeq] = useState(0)
    const handleNameChange = (e) => setName(e.target.value)
    const handlePriceChange = (e) => setPrice(e.target.value)
    useEffect(() => {
        //getNweets();
        onSnapshot(query(
            collection(dbService, "table"),
            orderBy("createAt", "desc"),
            limit(1)
        ), obj => {
            setTableCount(obj.docs[0].data().number_of_table);
        })
        onSnapshot(query(collection(dbService, "menu"),orderBy("seq", "asc")), obj => {
            setSeq(obj.docs.length);
            setMenu(obj.docs.map((doc) => ({
                id: doc.id,
            ...doc.data(),
            })));
        })
    }, []);
    const onSave = async (e) => {
        e.preventDefault();
        const table_target = {
            number_of_table: tableCount,
            createAt: Date.now(),
        }
        try {
            const docRef = await addDoc(collection(dbService, "table"), table_target)
        } catch (e) {
        }
    }
    const CountChange =number=>{
        setTableCount(parseInt(number))
    }
    const onSubmit =async (e)=>{
        e.preventDefault();
        const menu_target = {
            menuName: name,
            menuPrice: price,
            createAt: Date.now(),
            seq : seq,
        }
        try {
            const docRef = await addDoc(collection(dbService, "menu"), menu_target)
        } catch (e) {
        }
    }
    return (
        <Box>
            <Heading>ADMIN PAGE</Heading>
            <Divider pb={"10px;"}></Divider>
            <HStack>
                <Text>테이블 수 : </Text>
                {tableCount != 0 ? <NumberInput Count={tableCount} CountChange={CountChange}></NumberInput> : <></>}
                <Button colorScheme={"twitter"} onClick={onSave}>저장</Button>
                <Button colorScheme={"twitter"} onClick={()=>{onOpen()}} >메뉴 추가</Button>
            </HStack>
            <Divider pb={"10px;"}></Divider>
            {/*<MenuFactory></MenuFactory>*/}
            <Divider pb={"10px;"}></Divider>
            <Grid
                mt={10}
                px={{base: 10, lg: 10}}
                columnGap={8}
                rowGap={3}
                templateColumns={{
                    sm: "1fr",
                    md: "1fr 1fr",
                    lg: "repeat(3, 1fr)",
                    xl: "repeat(6, 1fr)",
                }}
            >
                {menu.length && menu.map((menu,index)=>(
                    <MenuItem data={menu}/>
                ))}
            </Grid>
            <UpdateAlertDialog isOpen={isOpen} onClose={onClose} cancelRef={cancelRef} value={price} State={'add'} CharValue={name}
                onChange={handlePriceChange} onCharValueChange={handleNameChange} onSubmit={onSubmit}
            />
        </Box>
    )

}
export default AdminPage