import "dotenv/config";
import { ConnectionRoute } from "./utils/routeEnums";
import type { WsData } from "./utils/routeUtils.types";
import { SupabaseClient } from "@supabase/supabase-js";

import { App, TemplatedApp, type WebSocket } from "uWebSockets.js";
import { chatRoute, handleDbChange } from "./routes/chat";
import { supabaseClient } from "./clients/supabaseClient";

const initWebsocket = async () =>
  App({})
    .ws("/*", {
      upgrade(res, req, context) {
        const chatData = chatRoute(req);
        let data = {};
        switch (true) {
          case !!chatData:
            data = chatData;
            break;
          default:
            res.close();
            break;
        }
        res.upgrade(
          { data },
          /* Spell these correctly */
          req.getHeader("sec-websocket-key"),
          req.getHeader("sec-websocket-protocol"),
          req.getHeader("sec-websocket-extensions"),
          context
        );
      },
      async open(ws: WebSocket<{ data: WsData }>) {
        switch (ws.getUserData()?.data?.connectionRoute) {
          case ConnectionRoute.LOBBY:
            const lobbyName = "/lobby/" + ws.getUserData().data.chatId;
            ws.subscribe(lobbyName);
            break;
        }
      },
      async close(ws) {
        const lobbyName = "/lobby/" + ws.getUserData()?.data.chatId;
        const msg = `${ws.getUserData()?.data.authToken} has left the chat`;
        ws.publish(lobbyName, msg);
      },
    })
    .listen(Number(process.env.WSPORT), (token) => {
      if (token) {
        console.log("Listening to port " + process.env.WSPORT);
      } else {
        console.log("Failed to listen to port " + process.env.WSPORT);
      }
    });

const initRealtime = (server: TemplatedApp, supabaseClient: SupabaseClient) => {
  supabaseClient
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "mystery_pact_lobby_messages",
      },
      (payload) => handleDbChange(payload, server)
    )
    .subscribe();
};

const main = async () => {
  let server = await initWebsocket();

  console.log("Initiating realtime");
  initRealtime(server, supabaseClient);
};

main();
