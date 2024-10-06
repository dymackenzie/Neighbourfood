import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
//import styles from "@/styles/Home.module.css";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { Button, Flex, Heading, Input, SimpleGrid, Text } from "@chakra-ui/react";
import ItemType from "@/types/Item";
import { useEffect, useState } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { itemConverter } from "@/types/Item";

import dynamic from 'next/dynamic'
import ItemComponent from "@/components/ItemComponent";
import Sidenav from "@/components/Sidenav";

const Test = dynamic(() => import('@/components/Test'), {
  ssr: false
})
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/firebase/clientApp";

const Home: NextPage = () => {

  // destructure user, loading, and error out of the hook
  const [user, loading, error] = useAuthState(auth);
  const [items, setItems] = useState<ItemType[]>([]);
  const [uid, setUID] = useState("");

  useEffect(() => {
    if (uid.length > 0) {
      axios.post('http://localhost:3000/api/listFiltered', {
        uid: uid,
        collectionName: "items",
        field: "neighborhood",
        operator: "==",
        value: "neighborhood"
      }).then((res) => setItems(res.data))
    }

  }, [uid])


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUID(user.uid)
      } else {
        console.log("logged out!")
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Head>
        <title>Neighbourfood</title>
        <meta name="description" content="to bring close communities closer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Flex>

          <Flex w={'20%'}>
            <Sidenav/>
          </Flex>
          
          <Flex flexDir={'column'} w={'80%'} ml={'40px'} mt={'50px'}>

            <Flex  h={'40vh'} flexDir={'row'}>

              <Flex flexDir={'column'} justifyContent={'center'}  w={'100%'}>
                <Heading fontSize={'6xl'}>Pass Your Plate,</Heading>
                <Heading fontSize={'6xl'}>Power Your Neighbourhood!</Heading>
                <Text mt={'20px'} fontSize={'4xl'}>Turn your excess food into smiles next door</Text>                
              </Flex>

              <Flex>

              </Flex>

            </Flex>
          
            <Flex w={'95%'} mt={'80px'} justifyContent={'space-between'}>
              <Text fontSize={'4xl'} fontWeight={'bold'}>Available Items</Text>
              
            </Flex>     


            <SimpleGrid columns={3} py={'5vh'} spacing={3} justifyContent={'space-around'} mr={3}>
            {items.map((item) => (
              <ItemComponent item={item} />
            ))}
          </SimpleGrid>
          </Flex>                    
        </Flex>       
    </>
  );
}


export default Home;
