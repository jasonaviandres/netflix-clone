import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

const useCurrentUser = () => {
    /**
     * by using SWR, it will not get fetched again if the data already exists
     */
    const { data, error, isLoading, mutate} = useSWR('/api/current', fetcher)

    return {
        data, 
        error,
        isLoading,
        mutate
    }
}

export default useCurrentUser;