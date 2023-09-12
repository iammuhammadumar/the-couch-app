export default {
    addChatRoom(body) {
        return this._callApi({
            method: 'post',
            resource: 'chat.addChat',
            body
        });
    },

    getChatRooms() {
        return this._callApi({
            method: 'get',
            resource: 'chat.getRooms'
        });
    },

    deleteChatRoom(chatId) {
        return this._callApi({
            method: 'post',
            resource: 'chat.deleteChat',
            pathParam: chatId
        });
    },

    getChatMessages(chatId, cursor) {
        return this._callApi({
            method: 'get',
            resource: 'chat.getMessages',
            pathParam: chatId,
            queryParams: {
                cursor
            }
        });
    },

    snoozeChat(chatId) {
        return this._callApi({
            method: 'post',
            resource: 'chat.snoozeChat',
            pathParam: chatId
        });
    }
};