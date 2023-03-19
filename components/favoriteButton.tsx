import axios from "axios";
import { FC, useCallback, useMemo } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({ movieId }) => {
    // mutateFavorites is just an alias, you can name it whatever you want. it's because we also have mutate in useCurrentUser
    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();

    /**
     * isFavorite() checks whether a particular movieId already in currentUser's favoriteIds or not
     */
    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        /**
         * includes() method determines whether an array includes a certain value among its entries
         * returns true or false
         */
        return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavorites = useCallback(async () => {
        let response;
        if (isFavorite) {
            response = await axios.delete("/api/favorite", {
                data: { movieId },
            });
        } else {
            response = await axios.post("/api/favorite", { movieId });
        }

        const updatedFavoriteIds = response?.data?.favoriteIds;

        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds,
        });

        mutateFavorites();
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;
    return (
        <div
            onClick={toggleFavorites}
            className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center hover:border-neutral-300"
        >
            <Icon className="text-white" size={25} />
        </div>
    );
};

export default FavoriteButton;
