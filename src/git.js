exports.getBranchName = function(ref) {
	return ref.replace('refs/heads/', '');
};

exports.getCommitDiffURL = function(host, from, until) {
	return host + '/compare/' + from + '...' + until;
};
