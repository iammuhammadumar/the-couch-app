export default {
    REST_API_ENDPOINTS: {
        "user": {
            "get": "/user",
            "getUsersList": "/users",
            "update": "/user",
            "updateProfile": "/user/profile",
            "updatePreference": "/user/preference",
            "updatePostLike": "/like/post",
            "updateUserLike": "/like/therapist",
            "getLikes": "/likes",
            "blockUser": "/block/{userId}",
            "swipeUser": "/swipe/{userId}",
            "getRecommendations": "/recommendation",
            "resetRecommendations": "/recommendation/reset",
            "searchUsers": "/search",
            "getPostLike": "/like/post",
            "getFirebaseAuthToken": "/user/fbAuth",
            "delete": "/user/delete"
        },
        "chat": {
            "addChat": "/chat",
            "getRooms": "/chat",
            "snoozeChat": "/chat/{chatRoomId}/snooze",
            "deleteChat": "/chat/{chatRoomId}/delete",
            "getMessages": "/chat/{chatRoomId}/messages"
        }
    },
    USER_ROLE: {
        THERAPIST: '1',
        CLIENT: '0'
    },
    SWIPE: {
        LEFT: '0',
        RIGHT: '1'
    },
    DEEP_LINK_DOMAIN: "thecouchapp.app.link"
};