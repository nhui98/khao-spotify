import { Box, Flex, Input, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useSWRConfig } from 'swr'
import { auth } from '../../lib/mutations'

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async e => {
        e.preventDefault()

        setIsLoading(true)

        await auth(mode, { email, password })
        setIsLoading(false)
        router.push('/')
    }

    return (
        <Box sx={{ height: '100vh', width: '100vw', background: 'black', color: 'white' }}>
            <Flex justifyContent='center' alignItems='center' height='100px'>
                khao
            </Flex>
            <Flex justify='center' align='center' height='calc(100vh - 100px)'>
                <Box padding='50px' backgroundColor='gray.800' borderRadius='6px'>
                    <form onSubmit={e => handleSubmit(e)}>
                        <Input placeholder='email' type='email' border='1px solid white' onChange={e => setEmail(e.target.value)} />
                        <Input placeholder='password' type='password' onChange={e => setPassword(e.target.value)} />
                        <Button type='submit' backgroundColor='green.500' isLoading={isLoading}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'green.300'
                                }
                            }}>
                            {mode}
                        </Button>
                    </form>
                </Box>
            </Flex>
        </Box>
    )
}

export default AuthForm