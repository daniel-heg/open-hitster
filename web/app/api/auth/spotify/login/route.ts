export const runtime = 'edge';

import { generateRandomString } from "@/app/utils";
import { redirect } from "next/navigation";

export async function GET() {
    const scope = "streaming \
               user-read-email \
               user-read-private"

    const state = generateRandomString(16);

    if (!process.env.SPOTIFY_CLIENT_ID)
        throw new Error("no SPOTIFY_CLIENT_ID set")

    const auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: `${process.env.HOST}/api/auth/spotify/callback`,
        state: state
    })

    redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString())
}