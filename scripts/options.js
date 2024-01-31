document.querySelectorAll("input").forEach(item => {
  item.addEventListener("keyup", saveSettings);
});

function saveSettings() {
  let connectionSettings = {
    cfgIpPhone: document.getElementById("cfgIpPhone").value,
    cfgPassword: document.getElementById("cfgPassword").value,
    cfgProtocol: document.getElementById("cfgProtocol").value,
    cfgUser: document.getElementById("cfgUser").value
  };

  chrome.storage.local.set({ connection: connectionSettings }).then(() => {});
}

chrome.storage.local.get(["connection"]).then(result => {
  if (!result.connection) return;

  console.log("Result", result.connection);

  document.getElementById("cfgIpPhone").value = result.connection.cfgIpPhone;
  document.getElementById("cfgPassword").value = result.connection.cfgPassword;
  document.getElementById("cfgProtocol").value = result.connection.cfgProtocol;
  document.getElementById("cfgUser").value = result.connection.cfgUser;
});
