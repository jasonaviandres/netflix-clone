import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from '../../lib/prismadb';
import serverAuth from "@/lib/serverAuth";

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 * This API Route is for adding and deleting favorite movie ids for particular user
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req);

            const { movieId} = req.body;

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId
                }
            })

            if (!existingMovie) {
                throw new Error('invalid ID')
            }

            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || "",
                },
                data: {
                    favoriteIds: {
                        push: movieId
                    }
                }
            })

            return res.status(200).json(user);
        }
        if (req.method === 'DELETE') {
            const { currentUser } = await serverAuth(req);
            const { movieId} = req.body;

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId
                }
            })
            if (!existingMovie) {
                throw new Error('Invalid ID')
            }

            const updateFavoriteIds = without(currentUser.favoriteIds, movieId)

            const updatedUser = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds: updateFavoriteIds
                }
            })

            return res.status(200).json(updatedUser);
        }

        // if the request method is not DELETE and POST, then return a response code 405 and end()
        return res.status(405).end();
    } catch (error) {
        console.log(error);
        return res.status(400).end()
    }
}