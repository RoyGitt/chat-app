import axios from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import SignUp from "../components/SignIn";
import SignIn from "../components/SignUp";

const HomePage = () => {
  return (
    <Container maxW="xl" bg="#333" color="#fff">
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="#000"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text>Chatify</Text>
      </Box>
      <Box>
        <Tabs>
          <TabList>
            <Tab>Sign In</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SignUp />
            </TabPanel>
            <TabPanel>
              <SignIn />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};
export default HomePage;
