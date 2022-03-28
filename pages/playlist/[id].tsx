import GradientLayout from "../../components/gradientLayout/gradientLayout";
import SongsTable from "../../components/songsTable/songsTable";
import { validateToken } from "../../lib/auth"
import prisma from "../../lib/prisma"

const getBGColor = id => {
    const colors = [
        'red', 'green', 'blue', 'orange', 'purple', 'gray', 'teal', 'yellow'
    ]

    return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

const Playlist = ({ playlist }) => {
    const color = getBGColor(playlist.id)
    return (
        <GradientLayout color={color} isRoundImg={false} title={playlist.name} subtitle='playlist' description={`${playlist.songs.length} songs`} image={`https://picsum.photos/400?random=${playlist.id}`}>
            <SongsTable songs={playlist.songs} />
        </GradientLayout>
    )
}

export const getServerSideProps = async ({ query, req }) => {
    const { id } = validateToken(req.cookies.COOKIE_TOKEN)
    const playlist = await prisma.playlist.findFirst({
        where: {
            id: +query.id,
            userId: id
        },
        include: {
            songs: {
                include: {
                    artist: {
                        select: {
                            name: true,
                            id: true
                        }
                    }
                }
            }
        }
    })

    console.log(playlist);


    return {
        props: { playlist }
    }
}

export default Playlist