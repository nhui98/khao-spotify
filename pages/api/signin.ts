import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    time: Date.now()
                },
                'secret',
                {
                    expiresIn: '8h'
                }
            )

            res.setHeader(
                'Set-Cookie',
                cookie.serialize(
                    'COOKIE_TOKEN',
                    token,
                    {
                        httpOnly: true,
                        maxAge: 8 * 60 * 60,
                        path: '/',
                        secure: process.env.NODE_ENV === 'production'
                    }
                )
            )

            res.status(200).json(user)
        } else {
            res.status(401).json({ error: 'Email or Password incorrect' })
        }
    } catch (error) {
        res.status(401).json({ error: 'Email or Password incorrect' })
    }
}