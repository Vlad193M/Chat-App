export enum ChatType {
  DIRECT = "DIRECT",
  GROUP = "GROUP",
}

export type UserType = {
  name: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
};

export type UserChatType = {
  chatId: string;
  chatType: ChatType;
  participants: string[];
  lastMessage: string;
  updatedAt: number;
};

export type DirectChatType = {
  created: number;
  participants: [string, string];
};

export type GroupChatType = {
  created: number;
  groupName: string;
  photoURL: string;
  adminId: string;
  participants: string[];
};

export type MessageType = {
  chatId: string;
  senderId: string;
  text: string;
  image: string;
  createdAt: number;
};
