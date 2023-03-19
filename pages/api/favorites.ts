import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '../../lib/prismadb'
import serverAuth from "@/lib/serverAuth";

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 * this API route is to fetch all favorite movies for particular user
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).end()
    }

    try {
        const { currentUser } = await serverAuth(req);

        /**
         * Finding all movies that have in relation to the user's favorite movies
         */

        const favoriteMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: currentUser.favoriteIds
                }
            }
        })

        return res.status(200).json(favoriteMovies)
    } catch (error) {
        console.log(error);
        return res.status(400).end()
    }
}
