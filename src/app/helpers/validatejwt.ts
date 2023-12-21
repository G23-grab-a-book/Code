import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
// serve per il get dell'user corrente

export const validateJWT = async (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        if (!token) {
            throw new Error("No token provided");
        }
        const decryptedToken: any = jwt.verify(token, process.env.jwt_secret!);
        return decryptedToken.id; // ritorna l'id associato al token di login (id dell'utente del db)
    } catch (error: any) {
        throw new Error(error.message);
    }
}