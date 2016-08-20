var Handler = require("./handler.js");

var format = require("string-format");

class PushHandler extends Handler {
  handle(json) {
    var header = format("_**{}** pushed {} commits to **{} ({})**_ :arrows_counterclockwise:",
      json.user_name,
      json.total_commits_count,
      json.project.name,
      json.ref.replace("refs/heads/", ""));

    var log = [];

    for (var commit of json.commits) {
      log.push(format("`{}` {}",
        commit.id.substring(0, 7),
        commit.message));
    }

    var combined = format("{}\n\n{}",
      header,
      log.join("\n\n"));

    return combined;
  }
}

module.exports = PushHandler;
