import { RtcTokenBuilder, RtcRole } from "agora-access-token";

const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID;
const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE;
const TOKEN_EXPIRATION_TIME = 3600; // 1 hour

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const channelName = searchParams.get("channelName");
  const uid = searchParams.get("uid");

  if (!channelName || !uid) {
    return new Response(
      JSON.stringify({ error: "Missing channelName or uid" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    parseInt(uid),
    RtcRole.PUBLISHER,
    Math.floor(Date.now() / 1000) + TOKEN_EXPIRATION_TIME
  );

  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
