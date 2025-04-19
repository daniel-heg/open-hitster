export const runtime = "edge";

interface IDs {
  youtube: string;
  spotify: string;
}

interface Song {
  id: string | number;
  title: string;
  artist: string;
  year: string | number;
  ids: IDs;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const collection = searchParams.get("collection");
  const id = searchParams.get("id");

  if (!collection || !id) {
    return new Response("Missing collection or id", { status: 400 });
  }

  const response = await fetch(`${origin}/collection/${collection}.json`);
  const data = await response.json();

  if (!data) {
    return new Response("Collection not found", { status: 404 });
  }

  const song = data.find((song: Song) => song.id == id);

  if (!song) {
    return new Response("Song not found", { status: 404 });
  }

  return new Response(JSON.stringify(song), {
    headers: { "Content-Type": "application/json" },
  });
}
