import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Table from "./Table";

const HomeTab = ({table_price})=>{
    return(
        <Tabs>
            <TabList>
                <Tab>1</Tab>
                <Tab>2</Tab>
                <Tab>3</Tab>
                <Tab>4</Tab>
            </TabList>
            <TabPanels>
                {[1,2,3,4].map((index)=>(
                    <TabPanel>
                        <Table key={index} table_price={table_price}></Table>
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    )
}

export default HomeTab;