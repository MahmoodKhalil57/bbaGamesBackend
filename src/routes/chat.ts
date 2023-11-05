// import type { ServerWebSocket } from "bun";
import { UUIDRegex, getUrlParts, parseCookies } from "../utils/routeUtils";
import type { WsData } from "../utils/routeUtils.types";
import { ConnectionRoute } from "../utils/routeEnums";
import { prisma } from "../clients/prismaClient";
import { HttpRequest, TemplatedApp } from "uWebSockets.js";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

export const chatRoute = (req: HttpRequest) => {
  const urlParts = getUrlParts(req);

  const cookies = parseCookies(req.getHeader("cookie"));
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

type NewData = {
  authUserId: string;
  id: string;
  message: string;
  mysteryPactLobbyId: string;
  timeStamp: string;
};

enum PayloadType {
  CHATMESSAGE,
}

type Message = {
  payloadType: PayloadType;
  content: string;
  author: string;
  timeStamp: string;
};

export const handleDbChange = (
  payload: RealtimePostgresChangesPayload<{
    [key: string]: any;
  }>,
  server: TemplatedApp
) => {
  if (payload.eventType === "INSERT") {
    const newData = payload.new as NewData;
    const lobbyId = newData.mysteryPactLobbyId;
    const lobbyName = "/lobby/" + lobbyId;

    const response = {
      payloadType: PayloadType.CHATMESSAGE,
      content: newData.message,
      author: newData.authUserId,
      timeStamp: newData.timeStamp,
    } as Message;
    server.publish(lobbyName, JSON.stringify([response]));
  }
};
