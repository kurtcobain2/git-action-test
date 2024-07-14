const core = require('@actions/core');
const github = require('@actions/github');


async function run() {
    try {
        const TOKEN = core.getInput('github-token');
        const octokit = github.getOctokit(TOKEN);

        octokit.rest.git.getCommit({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            commit_sha: github.context.sha
        }).then((res) => {
            core.setOutput('url', res.data.url);
        }).catch((err) => {
            core.setFailed(err);
        })
    } catch (error) {
        core.setFailed(error.message);
    }
}
run();