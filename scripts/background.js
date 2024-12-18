chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.phoneNumber) {
    makeCall(request.phoneNumber);

    //TODO: send response with the actual state
    sendResponse({ error: null });
  }
});

function makeCall(phoneNumber) {
  console.log("selected phone number: " + phoneNumber);
  // replace + with 00 first, then remove all characters but numbers
  let parsedNumber = (phoneNumber + "")
    .replace("+", "00")
    .replace(/[^0-9]/g, "");

  console.log("parsed phone number:   " + parsedNumber);

  //if phone number is invalid, abort
  if (parsedNumber.length <= 0) {
    chrome.notifications.create("NOTFICATION_ID", {
      type: "basic",
      iconUrl: "../icons/icon48.png",
      title: "Invalid Number",
      message: "'" + phoneNumber + "' is not a valid phone number.",
      priority: 2
    });
    return;
  }

  //if connectionSettings are missing, abort
  chrome.storage.local.get(["connection"]).then(result => {
    if (
      !result ||
      !result.connection ||
      !result.connection.cfgProtocol ||
      !result.connection.cfgUser ||
      !result.connection.cfgPassword ||
      !result.connection.cfgIpPhone
    ) {
      chrome.notifications.create("NOTFICATION_ID", {
        type: "basic",
        iconUrl: "../icons/icon48.png",
        title: "Credentials missing",
        message:
          "Please go to the extensions options page and provide credentials.",
        priority: 2
      });
      return;
    }

    chrome.tabs.create(
      {
        url:
          result.connection.cfgProtocol +
          "://" +
          result.connection.cfgUser +
          ":" +
          result.connection.cfgPassword +
          "@" +
          result.connection.cfgIpPhone +
          "/command.htm?number=" +
          parsedNumber,
        active: false
      },
      tab => {
        tabsToDelete.push(tab.id);
      }
    );
  });
}

let tabsToDelete = [];

chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
  if (tabsToDelete.length >= 1 && info.status === "complete") {
    let removeIdx = tabsToDelete.indexOf(tabId);
    if (removeIdx => 0) {
      chrome.tabs.remove(tabId, () => {
        tabsToDelete.splice(removeIdx, 1);
      });
    }
  }
});

chrome.runtime.onInstalled.addListener(function () {
  //   chrome.contextMenus.create({
  //     title: "TRY CALLING '%s' USING SNOMDIALER",
  //     contexts: ["selection"],
  //     id: "selection"
  //   });
  chrome.contextMenus.create({
    title: "SnomDialer CALL %s",
    contexts: ["link", "selection"],
    targetUrlPatterns: ["tel:*"],
    id: "callMenu"
  });
});

chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId !== "callMenu") return;

  makeCall(info.linkUrl ? info.linkUrl : info.selectionText);
});
