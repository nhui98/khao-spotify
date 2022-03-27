import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookie from "cookie"
import prisma from "../../lib/prisma"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const salt = bcrypt.genSaltSync()
    const { email, password } = req.body


    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: bcrypt.hashSync(password, salt)
            }
        })

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
            ),
        )

        res.status(200).json(user)
    } catch (error) {
        res.status(401).json({ error: 'User already exists' })
    }
}