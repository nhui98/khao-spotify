import NextLink from "next/link"
import { Box, LinkBox, LinkOverlay, List, ListIcon, ListItem } from "@chakra-ui/layout"

const SidebarMenu = ({ menu }) => {
    return (
        <Box marginY='20px'>
            <List spacing={2}>
                {
                    menu.map(item => (
                        <ListItem paddingX='20px' fontSize='16px' key={`${item.name}`}>
                            <LinkBox>
                                <NextLink href={item.route} passHref>
                                    <LinkOverlay>
                                        <ListIcon as={item.icon} color='white' marginRight='20px' />
                                        {item.name}
                                    </LinkOverlay>
                                </NextLink>
                            </LinkBox>
                        </ListItem >
                    ))
                }
            </List>
        </Box>
    )
}

export default SidebarMenu