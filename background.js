'use strict';

var callback = function (request) {

  var tabUrl = request.url;
  var keyArr = tabUrl.split('/');
  var key = keyArr[0] + '//' + keyArr[2];

  chrome.storage.sync.get([key], function (result) {

    if (result[key] != undefined && result[key] != "undefined") {

      var url = result[key] + "/";

      for (var i = 3; i < keyArr.length; i++) {
        if (keyArr[i] && keyArr[i] != "")
          url += keyArr[i] + "/";
      }

      if (tabUrl[tabUrl.length - 1] != "/")
        url = url.substr(0, url.length - 1);

      var destUrl = encodeURIComponent(url);

      if (destUrl != undefined && destUrl != "undefined")
        chrome.tabs.update(request.tabId, { url: url });

    }

  });
  // });
  // chrome.tabs.update(sender.tab.id, { url: request.redirect });
};

chrome.webRequest.onBeforeRequest.addListener(callback, { urls: ["<all_urls>"] });
