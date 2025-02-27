const core = require('@actions/core');
const github = require('@actions/github');


async function run() {
    try {
        const TOKEN = core.getInput('github-token');
        const octokit = github.getOctokit(TOKEN);

        octokit.rest.repos.getCommit({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            ref: github.context.sha
        }).then((res) => {
            core.setOutput('files', res.data.files);
        }).catch((err) => {
            core.setFailed(err);
        })
    } catch (error) {
        core.setFailed(error.message);
    }
}
run();