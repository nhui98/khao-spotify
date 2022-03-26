import NextLink from "next/link"
import { Box, LinkBox, LinkOverlay, List, ListItem } from "@chakra-ui/layout"

const SidebarPlaylist = ({ playlist }) => {
    return (
        <Box height='66%' overflowY='auto'>
            <List spacing={2}>
                {
                    playlist.map(item => (
                        <ListItem paddingX='20px' key={item}>
                            <LinkBox>
                                <NextLink href="/" passHref>
                                    <LinkOverlay>
                                        {item}
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