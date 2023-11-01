import { ServerWebSocket } from "bun";
import { UUIDRegex, getUrlParts, parseCookies } from "../utils/routeUtils";
import type { WsData } from "../utils/routeUtils.types";
import { ConnectionRoute } from "../utils/routeEnums";
import { prisma } from "../clients/prisma.server";

export const chatRoute = (req: Request) => {
  const urlParts = getUrlParts(req);

  const cookies = parseCookies(req.headers.get("cookie"));
  if (urlParts.length === 2) {
    if (urlParts[0] === ConnectionRoute.LOBBY && UUIDRegex.test(urlParts[1])) {
      const userInRoom = prisma.authUser.findUnique({
        where: {
          id: cookies?.auth_session,
          MysteryPactLobby: {
            some: {
              id: urlParts[1],
            },
          },
        },
      });
      if (userInRoom) {
        const data: WsData = {
          connectionRoute: ConnectionRoute.LOBBY,
          authToken: cookies?.auth_session,
          chatId: urlParts[1],
        };
        return data;
      }
    }
  }

  return false;
};

export const chatOnMessage = async (
  ws: ServerWebSocket<WsData>,
  message: string | Buffer
) => {
  console.log("🚀 ~ file: chat.ts:41 ~ message:", message);
  const lobbyName = "/lobby/" + ws.data.chatId;
  ws.publish(lobbyName, message);
};
