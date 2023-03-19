import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from "../lib/prismadb"

/**
 * 
 * This helper is to check whether the user already signed in or not by checking the JWT session token
 * and this is to secure API routes by checking is someone is signed in
 * 
 */

const serverAuth = async (req:NextApiRequest) => {
    /**
     * Fetches user login session
     */
    const session = await getSession({req})

    /**
     * if there is no session JWT token that gets stored
     */

    if (!session?.user?.email) {
        throw new Error('not signed in')
    }

    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    /**
     * if we can't get the current user from database
     */

    if (!currentUser) {
        throw new Error('Not signed in')
    }

    return { currentUser }
}

export default serverAuth;