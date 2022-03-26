import { Box, List, ListItem, ListIcon, Divider, Center, LinkBox, LinkOverlay, Text } from '@chakra-ui/layout'
import { MdHome, MdSearch, MdLibraryMusic, MdPlaylistAdd, MdFavorite } from "react-icons/md"

const Sidebar = () => {
    return (
        <Box sx={{ width: "100%", height: "calc(100vh - 100px)", backgroundColor: "black", paddingLeft: "5px", color: "gray" }}>
            <Box paddingY='20px'>
                <Box marginBottom='20px' paddingX='20px'>
                    <Text fontSize='4xl'>Khao</Text>
                </Box>
            </Box>
        </Box>
    )
}

export default Sidebar