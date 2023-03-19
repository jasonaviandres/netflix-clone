import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/userInfoModal";
/**
 *
 * @param context
 * This is to protect the Home route when user hasn't signed in
 * why not use serverAuth here? because it's on the server side, and we want to
 * do it on client side here
 */

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    /**
     * checks if the current session exists, means that user already/still signed in
     */

    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}

export default function Home() {
    const { data: movies = [] } = useMovieList();
    const { data: favorites = [] } = useFavorites();
    const { isOpen, closeModal } = useInfoModal();
    return (
        <>
            <InfoModal visible={isOpen} onClose={closeModal} />
            <Navbar />
            <Billboard />
            <div className="pb-40">
                <MovieList title="Trending now" data={movies} />
                <MovieList title="My list" data={favorites} />
            </div>
        </>
    );
}
