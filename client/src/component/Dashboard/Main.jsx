import React, { useState, useEffect } from "react";
import axios from "axios";
import IntensityChart from "./IntensityChart";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Navbar from "./Navbar";
import RegionChart from "./RegionChart";
import { ChakraProvider, Flex, Box, Grid } from "@chakra-ui/react";
import RelevanceBubbleChart from "./Relevance";
import TopicChart from "./TopicChart";
import PieChart from "./SectorChart";
import CountryChart from "./Country";
import LikelihoodRadarChart from "./LikelihoodChart";
import Footer from "./Footer";
import validUrl from 'valid-url';


Chart.register(CategoryScale);

const Main = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
     
      const API_URL = "http://localhost:5000";
      if (!validUrl.isUri(API_URL)) {
        console.error('Invalid URL:', API_URL);
        return;
      }
      try {
        const response = await axios.get(`${API_URL}/api/data`);
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
      }
    };

    fetchDataFromApi();
  }, []);

  return (
    <ChakraProvider>
      <Navbar />
      <IntensityChart data={data} />
      <Flex direction={{ base: "column", md: "row" }} m={50}>
        <Box
          flex={{ base: "1", md: "0.5" }}
          maxW="50%"
          p={5}
          m={2}
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
          borderRadius={20}
        >
          <RegionChart data={data} />
        </Box>
        <Box
          flex={{ base: "1", md: "0.5" }}
          maxW="50%"
          p={5}
          m={2}
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
          borderRadius={20}
        >
          <TopicChart data={data} />
        </Box>
      </Flex>
      <RelevanceBubbleChart data={data} />
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Box>
          <PieChart data={data} />
        </Box>
        <Box>
          <LikelihoodRadarChart data={data} />
        </Box>
      </Grid>
      <CountryChart data={data} />
      <Footer/>
    </ChakraProvider>
  );
};

export default Main;
