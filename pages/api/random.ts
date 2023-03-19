import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '../../lib/prismadb'
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    try {
        await serverAuth(req)

        const movieCount = await prismadb.movie.count()
        /**
         * Math.random() returns a floating-point, pseudo-random number that's greater than or equal to 0 and less than 1
         * Math.floor() always rounds down and returns the largest integer less than or equal to a given number
         */
        const randomIndex = Math.floor(Math.random() * movieCount)

        const randomMovies = await prismadb.movie.findMany({
            take: 1,
            skip: randomIndex
        })
        return res.status(200).json(randomMovies[0])
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}