var Handler = require("./handler.js");

var format = require("string-format");

class IssueHandler extends Handler {
  handle(json) {
    var action = json.object_attributes.action;

    if (action == "open") {
      return handleIssueOpened(json);
    } else if (action == "close") {
      return handleIssueClosed(json);
    }

    return null;
  }
}

function handleIssueOpened(json) {
  var header = format("_**{}** opened issue **{} (#{})**_\n\n",
    json.user.name, json.project.name, json.object_attributes.id);

  var body = format("_{}_\n\n{}",
    json.object_attributes.title, json.object_attributes.description);

  return header + body;
}

function handleIssueClosed(json) {
  var message = format("_**{}** closed issue **{} (#{})**_\n\n",
    json.user.name, json.project.name, json.object_attributes.id);

  return message;
}

function handleIssueAssigneeChange(json) {
  var message = format("_**{}** assigned **{}** to issue **{} (#{})**_\n\n",
    json.user.name, json.assignee.name, json.project.name, json.object_attributes.id);

  return message;
}

function handleIssueLabelChange(json) {

}

module.exports = IssueHandler;
