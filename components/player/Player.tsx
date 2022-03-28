import { Box, Center, Flex, Text } from '@chakra-ui/layout'
import ReactHowler from 'react-howler'
import { MdShuffle, MdSkipPrevious, MdSkipNext, MdOutlinePlayCircleFilled, MdOutlinePauseCircleOutline, MdOutlineRepeat } from 'react-icons/md'
import { useStoreActions } from 'easy-peasy'
import { IconButton, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { formatTime } from '../../lib/formatter'

const Player = ({ songs, activeSong }) => {
    const [playing, setPlaying] = useState(true)
    const [index, setIndex] = useState(songs.findIndex(song => song.id === activeSong.id))
    const [seek, setSeek] = useState(0.0)
    const [isSeeking, setIsSeeking] = useState(false)
    const [repeat, setRepeat] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [duration, setDuration] = useState(0.0)
    const soundRef = useRef(null)
    const repeatRef = useRef(null)
    const setActiveSong = useStoreActions((state: any) => state.changeActiveSong)

    useEffect(() => {
        let timerId

        if (playing && !isSeeking) {
            const f = () => {
                setSeek(soundRef.current.seek())
                timerId = requestAnimationFrame(f)
            }

            timerId = requestAnimationFrame(f)
            return () => cancelAnimationFrame(timerId)
        }

        cancelAnimationFrame(timerId)
    }, [playing, isSeeking])

    useEffect(() => {
        setActiveSong(songs[index])
    }, [index, setActiveSong, songs])

    useEffect(() => {
        repeatRef.current = repeat
    }, [repeat])

    const setPlayState = value => {
        setPlaying(value)
    }

    const onShuffleHandler = () => {
        setShuffle(state => !state)
    }

    const onRepeatHandler = () => {
        setRepeat(state => !state)
    }

    const prevSongHandler = () => {
        setIndex(state => {
            return state ? state - 1 : songs.length - 1
        })
    }

    const nextSongHandler = () => {
        setIndex(state => {
            if (shuffle) {
                const next = Math.floor(Math.random() * songs.length)

                if (next === state) {
                    return nextSongHandler()
                }

                return next
            }

            return state === songs.length - 1 ? 0 : state + 1

        })
    }

    const onSongEndHandler = () => {
        if (repeatRef.current) {
            setSeek(0)
            soundRef.current.seek(0)
        } else {
            nextSongHandler()
        }
    }

    const onSongLoadHandler = () => {
        const songDuration = soundRef.current.duration()
        setDuration(songDuration)
    }

    const onSeekHandler = e => {
        setSeek(parseFloat(e[0]))
        soundRef.current.seek(e[0])
    }

    return (
        <Box>
            <Box>
                <ReactHowler playing={playing} src={activeSong?.url} ref={soundRef} onLoad={() => onSongLoadHandler()} onEnd={() => onSongEndHandler()} />
            </Box>
            <Center color='gray.600'>
                <IconButton outline='none' variant='link' aria-label='shuffle' fontSize='24px' icon={<MdShuffle />} color={shuffle ? 'white' : 'gray.600'} onClick={() => onShuffleHandler()} />
                <IconButton outline='none' variant='link' aria-label='previous' fontSize='24px' icon={<MdSkipPrevious />} onClick={prevSongHandler} />
                {
                    playing ? (
                        <IconButton outline='none' variant='link' aria-label='pause' fontSize='32px' color='white' icon={<MdOutlinePauseCircleOutline />} onClick={() => setPlayState(false)} />
                    ) : (
                        <IconButton outline='none' variant='link' aria-label='play' fontSize='32px' color='white' icon={<MdOutlinePlayCircleFilled />} onClick={() => setPlayState(true)} />
                    )
                }
                <IconButton outline='none' variant='link' aria-label='next' fontSize='24px' icon={<MdSkipNext />} onClick={nextSongHandler} />
                <IconButton outline='none' variant='link' aria-label='repeat' fontSize='24px' icon={<MdOutlineRepeat />} color={repeat ? 'white' : 'gray.600'} onClick={() => onRepeatHandler()} />
            </Center>
            <Box color='gray.600'>
                <Flex justify='center' align='center'>
                    <Box width='10%'>
                        <Text fontSize='xs'>1:21</Text>
                    </Box>
                    <Box width='80%'>
                        <RangeSlider aria-label={['min', 'max']} step={0.1} min={0} max={duration ? duration.toFixed(2) : 0} id='player-range' onChange={onSeekHandler} value={[seek]} onChangeStart={() => setIsSeeking(true)} onChangeEnd={() => setIsSeeking(false)}>
                            <RangeSliderTrack bg='gray.800'>
                                <RangeSliderFilledTrack bg='gray.600' />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0} />
                        </RangeSlider>
                    </Box>
                    <Box width='10%' textAlign='right'>
                        <Text fontSize='xs'>{formatTime(duration)}</Text>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}

export default Player
