export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    throw new Error("no code received");
  }

  if (!process.env.SPOTIFY_CLIENT_ID)
    throw new Error("no SPOTIFY_CLIENT_ID set");

  if (!process.env.SPOTIFY_CLIENT_SECRET)
    throw new Error("no SPOTIFY_CLIENT_SECRET set");

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      code: code,
      redirect_uri: `${process.env.HOST}/api/auth/spotify/callback`,
      grant_type: "authorization_code",
    }),
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET,
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (result.status != 200) throw new Error("response is not OK");

  const response = await result.json();

  return new Response(JSON.stringify(response), {
    headers: { "Content-Type": "application/json" },
  });
}
