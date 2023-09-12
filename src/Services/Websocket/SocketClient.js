class SocketClient extends WebSocket {
    constructor(config) {
        super(`${config.endpoint}?userId=${config.userId}&token=${config.token}`);
        this._userId = config.userId;
    }

    sendMessage(message, chatRoomId, isNew = false) {
        console.log("sendMessage", message, chatRoomId);
        this.send(
            JSON.stringify({
                action: "sendMessage",
                user_id: this._userId,
                message: message,
                chat_room_id: chatRoomId,
                is_new_chat: isNew
            })
        );
    }
};

export default SocketClient;