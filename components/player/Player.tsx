import { Box, Center, Flex, Text } from '@chakra-ui/layout'
import ReactHowler from 'react-howler'
import { MdShuffle, MdSkipPrevious, MdSkipNext, MdOutlinePlayCircleFilled, MdOutlinePauseCircleOutline, MdOutlineRepeat } from 'react-icons/md'
import { useStoreActions } from 'easy-peasy'
import { IconButton, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from '@chakra-ui/react'
import { useState } from 'react'

const Player = ({ songs, activeSong }) => {
    const [playing, setPlaying] = useState(true)
    const [index, setIndex] = useState(0)
    const [seek, setSeek] = useState(0.0)
    const [repeat, setRepeat] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [duration, setDuration] = useState(0.0)

    const setPlayState = value => {
        setPlaying(value)
    }

    const onShuffleHandler = () => {
        setShuffle(state => !state)
    }

    const onRepeatHandler = () => {
        setRepeat(state => !state)
    }

    return (
        <Box>
            <Box>
                <ReactHowler playing={playing} src={activeSong?.url} />
            </Box>
            <Center color='gray.600'>
                <IconButton outline='none' variant='link' aria-label='shuffle' fontSize='24px' icon={<MdShuffle />} color={shuffle ? 'white' : 'gray.600'} onClick={() => onShuffleHandler()} />
                <IconButton outline='none' variant='link' aria-label='previous' fontSize='24px' icon={<MdSkipPrevious />} />
                {
                    playing ? (
                        <IconButton outline='none' variant='link' aria-label='pause' fontSize='32px' color='white' icon={<MdOutlinePauseCircleOutline />} onClick={() => setPlayState(false)} />
                    ) : (
                        <IconButton outline='none' variant='link' aria-label='play' fontSize='32px' color='white' icon={<MdOutlinePlayCircleFilled />} onClick={() => setPlayState(true)} />
                    )
                }
                <IconButton outline='none' variant='link' aria-label='next' fontSize='24px' icon={<MdSkipNext />} />
                <IconButton outline='none' variant='link' aria-label='repeat' fontSize='24px' icon={<MdOutlineRepeat />} color={repeat ? 'white' : 'gray.600'} onClick={() => onRepeatHandler()} />
            </Center>
            <Box color='gray.600'>
                <Flex justify='center' align='center'>
                    <Box width='10%'>
                        <Text fontSize='xs'>1:21</Text>
                    </Box>
                    <Box width='80%'>
                        <RangeSlider aria-label={['min', 'max']} step={0.1} min={0} max={300} id='player-range'>
                            <RangeSliderTrack bg='gray.800'>
                                <RangeSliderFilledTrack bg='gray.600' />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0} />
                        </RangeSlider>
                    </Box>
                    <Box width='10%' textAlign='right'>
                        <Text fontSize='xs'>3:00</Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}

export default Player
