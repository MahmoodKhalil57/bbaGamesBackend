import { ServerWebSocket } from "bun";
import { chatOnMessage, chatRoute } from "./routes/chat";
import { ConnectionRoute } from "./utils/routeEnums";
import type { WsData } from "./utils/routeUtils.types";

const server = Bun.serve<{ authToken: string }>({
  fetch(req, server) {
    const chatData = chatRoute(req);

    switch (true) {
      case !!chatData:
        server.upgrade(req, { data: chatData });
        break;
    }

    // handle HTTP request normally
    return new Response("Unknown Connection");
  },
  websocket: {
    // this is called when a message is received
    async open(ws: ServerWebSocket<WsData>) {
      switch (ws?.data?.connectionRoute) {
        case ConnectionRoute.LOBBY:
          const lobbyName = "/lobby/" + ws.data.chatId;
          ws.subscribe(lobbyName);
          break;
      }
    },
    async message(ws: ServerWebSocket<WsData>, message) {
      switch (ws?.data?.connectionRoute) {
        case ConnectionRoute.LOBBY:
          chatOnMessage(ws, message);
          break;
      }
    },
    async close(ws: ServerWebSocket<WsData>) {
      const lobbyName = "/lobby/" + ws.data.chatId;
      const msg = `${ws.data.authToken} has left the chat`;
      ws.unsubscribe(lobbyName);
      server.publish(lobbyName, msg);
    },
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);
