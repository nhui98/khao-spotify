import NextLink from "next/link"
import { Box, LinkBox, LinkOverlay, List, ListItem } from "@chakra-ui/layout"
import { usePlaylist } from "../../../lib/hooks"

const SidebarPlaylist = () => {
    const { playlists } = usePlaylist()
    return (
        <Box height='66%' overflowY='auto'>
            <List spacing={2}>
                {
                    playlists.map(item => (
                        <ListItem paddingX='20px' key={item.id}>
                            <LinkBox>
                                <NextLink href={{ pathname: '/playlist/[id]', query: { id: item.id } }} passHref>
                                    <LinkOverlay>
                                        {item.name}
                                    </LinkOverlay>
                                </NextLink>
                            </LinkBox>
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    )
}

export default SidebarPlaylist