import { Box, Flex, Text } from "@chakra-ui/layout"
import { useStoreState } from 'easy-peasy'
import Player from "../player/Player"

const PlayerBar = () => {
    const songs = useStoreState((state: any) => state.activeSongs)
    const activeSong = useStoreState((state: any) => state.activeSong)

    return (
        <Box height='100px' width='100vw' bg='gray.900' padding='10px'>
            <Flex>
                {
                    activeSong && (
                        <Box padding='20px' color='white' width='30%'>
                            <Text fontSize='large' textTransform='capitalize'>{activeSong.name}</Text>
                            <Text fontSize='small' textTransform='capitalize'>{activeSong.artist.name}</Text>
                        </Box>
                    )
                }

                <Box width='40%'>
                    {
                        activeSong && (
                            <Player songs={songs} activeSong={activeSong} />
                        )
                    }
                </Box>
            </Flex>
        </Box>
    )
}

export default PlayerBar