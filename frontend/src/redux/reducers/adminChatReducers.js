import * as actionTypes from "../constants/chatConstants";

const CHAT_INITIAL_STATE = {
  socket: false,
  chatRooms: {},
  messageReceived: false,
};

export const adminChatReducer = (state = CHAT_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_CHATROOMS:
      let currentState = { ...state };
      //console.log("Current state before reducer", currentState)
      if (state.chatRooms[action.payload.user]) {
        currentState.chatRooms[action.payload.user].push({
          client: action.payload.message,
        });
        // console.log("IF", {
        //   ...state,
        //   chatRooms: { ...currentState.chatRooms },
        // })
        return {
          ...state,
          chatRooms: { ...currentState.chatRooms },
        };
      } else {
        // console.log("ELSE" ,{
        //   ...state,
        //   chatRooms: {
        //     ...currentState.chatRooms,
        //     [action.payload.user]: [{ client: action.payload.message }],
        //   },
        // })
        return {
          ...state,
          chatRooms: {
            ...currentState.chatRooms,
            [action.payload.user]: [{ client: action.payload.message }],
          },
        };
      }
    case actionTypes.SET_SOCKET:
      return {
        ...state,
        socket: action.payload.socket,
      };
    case actionTypes.MESSAGE_RECEIVED:
      return {
        ...state,
        messageReceived: action.payload.value,
      };
    case actionTypes.REMOVE_CHATROOM:
      let currentState2 = { ...state };
      delete currentState2.chatRooms[action.payload.socketId];
      return {
        ...state,
        chatRooms: { ...currentState2.chatRooms },
      };
    default:
      return state;
  }
};
