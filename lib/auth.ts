import jwt from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "./prisma"

export const validateRoute = (handler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const { COOKIE_TOKEN } = req.cookies

        if (COOKIE_TOKEN) {
            try {
                const { id } = jwt.verify(COOKIE_TOKEN, 'secret')

                const user = await prisma.user.findUnique({
                    where: {
                        id
                    }
                })

                if (!user) throw new Error('no user')

                return handler(req, res, user)

            } catch (error) {
                res.status(401).json({ error: "not authorised" })
            }
        }

        res.status(401).json({ error: 'not authorised' })
    }
}

export const validateToken = token => {
    const user = jwt.verify(token, 'secret')
    return user
}