import { Box, Divider, Text } from '@chakra-ui/layout'
import { MdHome, MdSearch, MdLibraryMusic, MdPlaylistAdd, MdFavorite } from "react-icons/md"
import SidebarMenu from "./sidebar-menu/sidebarMenu"
import SidebarPlaylist from "./sidebar-playlist/sidebarPlaylist"

const navMenu = [
    {
        name: "Home",
        icon: MdHome,
        route: "/"
    },
    {
        name: "Search",
        icon: MdSearch,
        route: "/search"
    },
    {
        name: "Your Libray",
        icon: MdLibraryMusic,
        route: "/library"
    },
]

const musicMenu = [
    {
        name: 'Create Playist',
        icon: MdPlaylistAdd,
        route: '/'
    },
    {
        name: 'Favourites',
        icon: MdFavorite,
        route: '/favourites'
    }
]

const playlist = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`)

const Sidebar = () => {
    return (
        <Box sx={{ width: "100%", height: "calc(100vh - 100px)", backgroundColor: "black", paddingLeft: "5px", color: "gray" }}>
            <Box paddingY='20px' height='100%'>
                <Box paddingX='20px'>
                    <Text fontSize='4xl'>Khao</Text>
                </Box>

                <SidebarMenu menu={navMenu} />

                <SidebarMenu menu={musicMenu} />

                <Divider marginY='20px' color='gray.800' />

                <SidebarPlaylist playlist={playlist} />

            </Box>
        </Box>
    )
}

export default Sidebar