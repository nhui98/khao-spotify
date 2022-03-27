import useSWR from "swr";
import fetcher from "./fetcher";

export const useMe = () => {
    const { data, error } = useSWR('/me', fetcher)

    return {
        user: data,
        isLoading: !data && !error,
        isError: error
    }
}

// swr - library used for data fetching and storing it locally
// revalidates this data

export const usePlaylist = () => {
    const { data, error } = useSWR('/playlist', fetcher)

    return {
        playlists: (data as any) || [],
        isLoading: !data && !error,
        isError: error
    }
}