app.factory('SockFactory', function ($http) {

  return {
    singleSock: function(sockId) {
      return $http.get('/api/sock/'+sockId)
      .then(function(res) {
        return res.data
      })
    },

    sockByUserId: function(userId) {
      return $http.get('/api/sock/byUser/' + userId)
      .then(function(res) {
        return res.data
      })
    },

    mostRecentSocks: function () {
    	return $http.get('/api/sock/recent')
    	.then(function(res) {
    		return res.data
    	})
    },

    saveDesign: function (newSockDataObj) {
      return $http.post('/api/sock/', newSockDataObj)
    },

    prepareTags: function (tagInput) {
      return tagInput.split(' ').map(function(e) {
        e = e.replace(/,/i, "");
        e = e.substring(1);
        return e
      });
    },

    upvote: function (sockId) {
      return $http.post('/api/sock/upvote', {id: sockId})
      .then(function(res) {
        console.log(res.data)
        return res.data;
      })
    },

    downvote: function (sockId) {
      return $http.post('/api/sock/downvote', {id: sockId})
      .then(function(res) {
        return res.data;
      })
    }

  }

})
