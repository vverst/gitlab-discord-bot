var Handler = require("./handler.js");

var format = require("string-format");

class IssueHandler extends Handler {
  handle(json) {
    switch (json.object_attributes.noteable_type) {
      case 'MergeRequest':
        return handleMergeRequestNote(json);
      case 'Commit':
        return handleCommitNote(json);
      case 'Snippet':
        return handleSnippet(json);
    }

    return null;
  }
}

function handleMergeRequestNote(json) {
  var header = format(":speech_balloon:  _**{}** commented on merge request **{} (#{})**_\n\n",
    json.user.name, json.project.name, json.merge_request.id);

  var body = json.object_attributes.note;

  return header + body;
}

function handleCommitNote(json) {
  var header = format(":speech_balloon:  _**{}** commented on commit **{}** `{}`_\n\n",
    json.user.name, json.project.name, json.commit.id.substring(0, 7));

  var body = json.object_attributes.note;

  return header + body;
}

function handleSnippetNote(json) {
  var header = format(":speech_balloon:  _**{}** commented on snippet **{} #{}**_\n\n",
    json.user.name, json.project.name, json.snippet.id);

  var body = json.object_attributes.note;

  return header + body;
}

module.exports = IssueHandler;
