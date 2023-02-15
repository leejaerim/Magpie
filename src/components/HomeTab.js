import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Table from "./Table";

const HomeTab = ({table_price})=>{
    return(
        <Tabs  isFitted variant='enclosed' variant='soft-rounded' colorScheme='blue'>
            <TabList>
                <Tab>1</Tab>
                <Tab>2</Tab>
                <Tab>3</Tab>
                <Tab>4</Tab>
            </TabList>
            <TabPanels>
                {[1,2,3,4].map((index)=>(
                    <TabPanel key={index}>
                        <Table  table_price={table_price}></Table>
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    )
}

export default HomeTab;