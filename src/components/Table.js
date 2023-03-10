import TableCard from "./TableCard";
import {Box, Button, Divider, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {collection, onSnapshot, query, doc, where, addDoc, updateDoc} from "firebase/firestore";
import {dbService} from "../fbase";

const Table =({index, setIndex, table_index,table_price})=> {
    const [menus, setMenus] = useState([]);
    const [count, setCount] = useState([]);
    const [ref , setRef] = useState(null);
    const [totalPrice , setTotalPrice] = useState(0);
    useEffect(()=>{
        if(menus.length && count.length){
            let table_sum = 0
            menus.map((menu,index)=>{
                table_sum += menu.menuPrice * count[index]
            })
            setTotalPrice(table_sum)
        }
    },[count,menus])
    useEffect(() => {
        //getNweets();
        onSnapshot(collection(dbService, "menu"), obj => {
            setMenus(obj.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })));
            setCount(prev=>[ ...Array(obj.docs.length).keys() ].map( i => 0))
        })
        onSnapshot(query(collection(dbService, "count"), where("index", "==", table_index)), async obj => {
            if(obj.docs.length == 0){
                if(count.length != 0){
                    const index_count = {
                        index: table_index,
                        count: count,
                        createAt: Date.now(),
                    }
                    try {
                        const docRef = await addDoc(collection(dbService, "count"), index_count)
                    } catch (e) {
                    }
                }
            }else{
                setCount(prev=>obj.docs[0].data().count)
                setRef(doc(dbService, "count", `${obj.docs[0].id}`));
            }
        })
    }, []);

    const SumPrice =(price)=>{
        setTotalPrice(prev => prev + price)
    }
    const SubPrice =(price)=>{
        setTotalPrice(prev => prev - price)
    }

    const payment= async ()=>{
        table_price(totalPrice)
        setTotalPrice(0)
        setCount(prev=>[ ...Array(prev.length).keys() ].map( i => 0))
        if(ref != null){
            await updateDoc(ref, { count: [ ...Array(count.length).keys() ].map( i => 0) });
        }
    }
    const countPlus= async (i)=>{
        count[i]+=1
        setCount(prev => count)
        if(ref != null){
            await updateDoc(ref, { count: count });
        }
    }
    const countMinus= async (i)=>{
        count[i]-=1
        setCount(prev => count)
        if(ref != null){
            await updateDoc(ref, { count: count });
        }
    }

    return (
        <Box className={index === table_index ? 'active':'none'}>
            {menus.map((menu, i)=>(
                <TableCard key={i} index={i} sum={SumPrice} sub={SubPrice} menu_name={menu.menuName} menu_price={parseInt(menu.menuPrice)} countPlus={countPlus} count={count[i]} countMinus={countMinus}></TableCard>
            ))}
            <Divider mt={5} mb={5} orientation='horizontal' />
            <Button w={'30%'} size={'lg'} colorScheme='twitter' onClick={setIndex}>?????????</Button>
            <Button w={'30%'} ml={5} colorScheme='red' size={'lg'} onClick={payment}>??????</Button>
            <Text fontWeight={'bold'} fontSize={'30px;'} mt={'10px;'}>?????? : {totalPrice}</Text>
        </Box>
    )
}
export default Table