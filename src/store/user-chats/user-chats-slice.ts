import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserChatsStateType, ExtendedUserChatType } from "./user-chats-type";

const initialState: UserChatsStateType = {
  chats: [],
  loading: false,
  error: "",
};

const userChatsSlice = createSlice({
  name: "user-chats",
  initialState,
  reducers: {
    setUserChats: (state, action: PayloadAction<ExtendedUserChatType[]>) => {
      state.chats = action.payload;
    },

    addUserChat: (state, action: PayloadAction<ExtendedUserChatType>) => {
      state.chats.push(action.payload);
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setUserChats, addUserChat, setLoading, setError } =
  userChatsSlice.actions;
export default userChatsSlice.reducer;
