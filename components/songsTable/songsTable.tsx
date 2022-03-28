import { Box } from '@chakra-ui/layout'
import { BsFillPlayFill } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { formatDate, formatTime } from '../../lib/formatter'

const SongsTable = ({ songs }) => {
    return (
        <Box bg='transparent' color='white'>
            <Box padding='10px' marginBottom='20px'>
                <IconButton icon={<BsFillPlayFill fontSize='30px' />} size="lg" isRound aria-label='play' colorScheme='green' />
            </Box>
            <Table variant='unstyled'>
                <Thead borderBottom='1px solid' borderColor='rgba(255, 255, 255, 0.2)'>
                    <Tr>
                        <Th>#</Th>
                        <Th>Title</Th>
                        <Th>Date Added</Th>
                        <Th><AiOutlineClockCircle /></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {songs.map((song, i) => (
                        <Tr
                            sx={{
                                transition: 'all 0.3s',
                                '&:hover': {
                                    bg: 'rgba(255,255,255,0.1)'
                                }
                            }}
                            cursor='pointer'
                            key={song.id}>
                            <Td>{i + 1}</Td>
                            <Td>{song.name}</Td>
                            <Td>{formatDate(song.createdAt)}</Td>
                            <Td>{formatTime(song.duration)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    )
}

export default SongsTable