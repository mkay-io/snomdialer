chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.phoneNumber) {
    makeCall(request.phoneNumber);

    sendResponse({ farewell: "goodbye" });
  }
});

function makeCall(phoneNumber) {
  chrome.tabs.create(
    {
      url:
        cfgProtocol +
        "://" +
        cfgUser +
        ":" +
        cfgPassword +
        "@" +
        cfgIpPhone +
        "/command.htm?number=" +
        phoneNumber,
      active: false
    },
    tab => {
      console.log("opened tab", tab);
    }
  );
}

chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
  console.log("info", info);
  console.log("tab", tab);
  if (info.status === "complete") {
    console.log("finished loading");
    //chrome.tabs.remove(tabId);
  }

  //   setTimeout(() => {
  //     chrome.tabs.remove(tab.id);
  //   }, 5000);
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: "CALL THIS NUMBER",
    contexts: ["selection"],
    id: "selection"
  });
  chrome.contextMenus.create({
    title: "CALL THIS NUMBER",
    contexts: ["link"],
    id: "link"
  });
});

chrome.contextMenus.onClicked.addListener(function (info) {
  let phoneNumber;
  switch (info.menuItemId) {
    case "link":
      phoneNumber = info.linkUrl;
      break;

    case "selection":
      // Checkbox item function
      phoneNumber = info.selectionText;
      break;

    default:
      console.log("NOT AVAILABLE");
      return;
  }

  phoneNumber = phoneNumber.replace("+", "00").replace(/[^0-9]/g, "");

  if (phoneNumber.length <= 0) {
    // chrome.notifications.create("NOTFICATION_ID", {
    //   type: "basic",
    //   iconUrl: "phone.png",
    //   title: "Fehler",
    //   message: "Telefonnummer nicht erkannt.",
    //   priority: 2
    // });
    return;
  }

  makeCall(phoneNumber);
});
