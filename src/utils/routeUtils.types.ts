import type { ConnectionRoute } from "../utils/routeEnums";

export type WsData = {
  connectionRoute: ConnectionRoute;
  authToken: string;
  chatId: string;
};

export type FormattedCookiesType = {
  cookiesVersion: string;
  unloggedinSession: string;
  google_oauth_state: string;
  auth_session: string;
};
