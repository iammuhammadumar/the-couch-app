export default {
    updateUser(body) {
        return this._callApi({
            method: 'post',
            resource: 'user.update',
            body
        });
    },

    updateProfile(attrName, body) {
        return this._callApi({
            method: 'post',
            resource: 'user.updateProfile',
            pathParam: attrName,
            body
        });
    },

    updatePreference(attrName, body) {
        return this._callApi({
            method: 'post',
            resource: 'user.updatePreference',
            pathParam: attrName,
            body
        });
    },

    updatePostLike(postId) {
        return this._callApi({
            method: 'post',
            resource: 'user.updatePostLike',
            pathParam: postId
        });
    },

    updateUserLike(therapistId) {
        return this._callApi({
            method: 'post',
            resource: 'user.updateUserLike',
            pathParam: therapistId
        });
    },

    getUser(userId) {
        return this._callApi({
            method: 'get',
            resource: 'user.get',
            pathParam: userId
        });
    },

    getUsersList() {
        return this._callApi({
            method: 'get',
            resource: 'user.getUsersList',
        });
    },

    getUserLikes() {
        return this._callApi({
            method: 'get',
            resource: 'user.getLikes'
        });
    },

    blockUser(body, userId) {
        return this._callApi({
            method: 'post',
            resource: 'user.blockUser',
            body,
            pathParam: userId
        });
    },

    swipeUser(body, userId) {
        return this._callApi({
            method: 'post',
            resource: 'user.swipeUser',
            body,
            pathParam: userId
        });
    },

    getRecommendations(numOfRecs = 2) {
        return this._callApi({
            method: 'get',
            resource: 'user.getRecommendations',
            queryParams: {
                rank: numOfRecs
            }
        });
    },

    resetRecommendations() {
        return this._callApi({
            method: 'post',
            resource: 'user.resetRecommendations'
        });
    },

    searchUsers(searchQuery) {
        return this._callApi({
            method: 'get',
            resource: 'user.searchUsers',
            queryParams: {
                search: searchQuery
            }
        });
    },

    getPostLike(postId) {
        return this._callApi({
            method: 'get',
            resource: 'user.getPostLike',
            queryParams: {
                postId
            }
        });
    },

    getFirebaseAuthToken() {
        return this._callApi({
            method: 'get',
            resource: 'user.getFirebaseAuthToken'
        });
    },

    deleteAccount() {
        return this._callApi({
            method: 'post',
            resource: 'user.delete'
        });
    }
}