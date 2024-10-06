import { Box, Button, Flex, Image, Text } from "@chakra-ui/react"
import { FaLocationDot } from "react-icons/fa6"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { auth } from "@/firebase/clientApp"
import axios from "axios"
import Account from "@/types/Account"

const Navbar = () => {
    const router = useRouter()
    const [user, setUser] = useState<Account>()
    const [uid, setUID] = useState("")

    useEffect(() => {
        if (uid.length > 0) {
            axios.post('http://localhost:3000/api/getUser', {uid: uid}).then((res) => setUser(res.data))
        }
    }, [uid])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            setUID(user.uid)      
            console.log(user.uid)      
            //setUser(user);
            //getUserProfile(user.uid);
          } else {
            //setUser(null);
            //setProfile(null);
            console.log("logged out!")
          }
        });
        return () => unsubscribe();
      }, []);

    return (
        <Flex h={'10vh'} borderBottom={'3px solid black'}>
            <Flex justifyContent={'center'} alignItems={'center'} w={'20%'} fontSize={'xl'} cursor={'pointer'} onClick={() => router.push('/')}>
                <Image h={'100%'} src={'https://static-00.iconduck.com/assets.00/nextjs-icon-2048x1234-pqycciiu.png'}/>
            </Flex>
            <Flex alignItems={'center'} w={'60%'} fontSize={'2xl'}>
                <FaLocationDot/>
                <Text ml={2}>{user?.neighborhoodName}</Text>

            </Flex>       
            {     
            user ? <Text fontSize={'2xl'}>Hi, {user.name}</Text> :
            <><Flex justifyContent={'center'} alignItems={'center'} w={'10%'} fontSize={'md'}>
                <Button onClick={() => router.push('/login')} variant={'ghost'}>Log In</Button>
            </Flex>
            <Flex justifyContent={'center'} alignItems={'center'} w={'10%'} fontSize={'md'}>
                <Button onClick={() => router.push('/signup')}>Sign Up</Button>
            </Flex></>
}

        </Flex>
    )
}

export default Navbar