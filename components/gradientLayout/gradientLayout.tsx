import { Box, Flex, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"

const GradientLayout = ({ color, children, title, subtitle, image, isRoundImg, description }) => {
    return (
        <Box
            height='100%'
            overflowY='auto'
            bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}>
            <Flex bg={`${color}.600`} padding='40px' alignItems='flex-end'>
                <Box padding='20px'>
                    <Image boxSize='160px' boxShadow='2xl' src={image} borderRadius={isRoundImg ? '50%' : '3px'} />
                </Box>
                <Box padding='20px' lineHeight='1.5' color='white' letterSpacing='.04em'>
                    <Text fontSize='xx-small' fontWeight='500' textTransform='uppercase'>{subtitle}</Text>
                    <Text fontSize='6xl' fontWeight='bold'>{title}</Text>
                    <Text fontSize='sm' fontWeight='100'>{description}</Text>
                </Box>
            </Flex>
            <Box paddingY='50px'>
                {children}
            </Box>
        </Box>
    )
}

export default GradientLayout