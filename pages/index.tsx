import { Box, Center, Flex, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"
import GradientLayout from "../components/gradientLayout/gradientLayout"
import { useMe } from "../lib/hooks"
import prisma from "../lib/prisma"

const Home = ({ artists }) => {
  const { user, isLoading, error } = useMe()

  return (
    <GradientLayout color='blue' subtitle='profile' title={`${user?.firstName} ${user?.lastName}`} image='/avatar.jpg' description={`${user?.playlistCount}`} isRoundImg>
      <Box color='white' paddingX='40px'>
        <Box sx={{ marginBottom: '40px' }}>
          <Text fontSize='2xl' fontWeight='bold'>Top artist this month</Text>
          <Text>only visible to you</Text>
        </Box>
        <Flex columnGap='20px'>
          {
            artists.map(artist => (
              <Flex bg='gray.900' borderRadius='4px' padding='15px' width='15%' rowGap='20px' flexDirection='column'>
                <Center>
                  <Image src='/avatar.jpg' borderRadius='50%' width='100%' />
                </Center>
                <Box>
                  <Text fontSize='large'>{artist.name}</Text>
                  <Text color='rgba(255, 255, 255, .7)'>artist</Text>
                </Box>
              </Flex>
            ))
          }
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})

  return {
    props: { artists }
  }
}

export default Home
