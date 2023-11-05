export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _AuthUserToMysteryPactLobby: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: [
          {
            foreignKeyName: "_AuthUserToMysteryPactLobby_A_fkey"
            columns: ["A"]
            referencedRelation: "auth_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_AuthUserToMysteryPactLobby_B_fkey"
            columns: ["B"]
            referencedRelation: "mystery_pact_lobby"
            referencedColumns: ["id"]
          }
        ]
      }
      auth_key: {
        Row: {
          hashed_password: string | null
          id: string
          user_id: string
        }
        Insert: {
          hashed_password?: string | null
          id: string
          user_id: string
        }
        Update: {
          hashed_password?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "auth_key_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "auth_user"
            referencedColumns: ["id"]
          }
        ]
      }
      auth_session: {
        Row: {
          active_expires: number
          id: string
          idle_expires: number
          user_id: string
        }
        Insert: {
          active_expires: number
          id: string
          idle_expires: number
          user_id: string
        }
        Update: {
          active_expires?: number
          id?: string
          idle_expires?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "auth_session_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "auth_user"
            referencedColumns: ["id"]
          }
        ]
      }
      auth_token: {
        Row: {
          created: string
          id: string
          user_id: string
        }
        Insert: {
          created?: string
          id: string
          user_id: string
        }
        Update: {
          created?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "auth_token_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "auth_user"
            referencedColumns: ["id"]
          }
        ]
      }
      auth_user: {
        Row: {
          email: string
          firstName: string
          id: string
          is_admin: boolean
          is_verified: boolean
          lastName: string
          mysteryPactLobbyMessagesId: string | null
          profilePicture: string
          username: string
        }
        Insert: {
          email: string
          firstName: string
          id: string
          is_admin?: boolean
          is_verified?: boolean
          lastName: string
          mysteryPactLobbyMessagesId?: string | null
          profilePicture: string
          username: string
        }
        Update: {
          email?: string
          firstName?: string
          id?: string
          is_admin?: boolean
          is_verified?: boolean
          lastName?: string
          mysteryPactLobbyMessagesId?: string | null
          profilePicture?: string
          username?: string
        }
        Relationships: []
      }
      mystery_pact_lobby: {
        Row: {
          id: string
          maxPlayers: number
          name: string
        }
        Insert: {
          id: string
          maxPlayers: number
          name: string
        }
        Update: {
          id?: string
          maxPlayers?: number
          name?: string
        }
        Relationships: []
      }
      mystery_pact_lobby_messages: {
        Row: {
          authUserId: string
          id: string
          message: string
          mysteryPactLobbyId: string
          timeStamp: string
        }
        Insert: {
          authUserId: string
          id: string
          message: string
          mysteryPactLobbyId: string
          timeStamp?: string
        }
        Update: {
          authUserId?: string
          id?: string
          message?: string
          mysteryPactLobbyId?: string
          timeStamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "mystery_pact_lobby_messages_authUserId_fkey"
            columns: ["authUserId"]
            referencedRelation: "auth_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mystery_pact_lobby_messages_mysteryPactLobbyId_fkey"
            columns: ["mysteryPactLobbyId"]
            referencedRelation: "mystery_pact_lobby"
            referencedColumns: ["id"]
          }
        ]
      }
      unlogged_user: {
        Row: {
          id: string
        }
        Insert: {
          id: string
        }
        Update: {
          id?: string
        }
        Relationships: []
      }
      user_data: {
        Row: {
          id: string
          loggedUserId: string | null
          unloggedUserId: string | null
        }
        Insert: {
          id: string
          loggedUserId?: string | null
          unloggedUserId?: string | null
        }
        Update: {
          id?: string
          loggedUserId?: string | null
          unloggedUserId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_data_loggedUserId_fkey"
            columns: ["loggedUserId"]
            referencedRelation: "auth_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_data_unloggedUserId_fkey"
            columns: ["unloggedUserId"]
            referencedRelation: "unlogged_user"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
