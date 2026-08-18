import { clerkClient, requireAuthenticatedUserId } from "@/lib/server/clerk";
import { streamApiKey, streamServerClient } from "@/lib/server/stream";

const TOKEN_TTL_SECONDS = 60 * 60 * 4; // 4 hours

export async function GET(request: Request) {
  let userId: string;
  try {
    userId = await requireAuthenticatedUserId(request);
  } catch (err) {
    console.error("Failed to authenticate Stream session request", err);
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await clerkClient.users.getUser(userId);
  const primaryEmail = user.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId,
  )?.emailAddress;
  const userName =
    [user.firstName, user.lastName].filter(Boolean).join(" ").trim() ||
    user.username ||
    primaryEmail ||
    userId;
  const userImage = user.imageUrl;

  await streamServerClient.upsertUsers([
    { id: userId, name: userName, image: userImage },
  ]);

  const token = streamServerClient.generateUserToken({
    user_id: userId,
    validity_in_seconds: TOKEN_TTL_SECONDS,
  });

  return Response.json({
    apiKey: streamApiKey,
    userId,
    userName,
    userImage,
    token,
  });
}
