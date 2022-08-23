const inquirer = require("inquirer");
const chalk = require("chalk");
const { getRepo } = require("./api");
const { loading, downloadGitRepo } = require("../util/util");

// 获取模板信息及用户最终选择的模板
async function getRepoInfo() {
  // 获取组织下的仓库信息
  let repoList = await getRepo();
  // 提取仓库名
  const repos = repoList.map((item) => item.name);
  // 选取模板信息
  let { repo } = await new inquirer.prompt([
    {
      name: "repo",
      type: "list",
      message: "Please choose a template",
      choices: repos,
    },
  ]);
  return repo;
}

class Creator {
  // 项目名称及项目路径
  constructor(name, target) {
    this.name = name;
    this.target = target;
  }
  // 创建项目部分
  async create() {
    // 仓库信息 —— 模板信息
    let repo = await getRepoInfo();
    await this.download(repo);

    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
    console.log("  npm install\r\n");
    console.log("  npm run dev\r\n");
  }
  async download(repo, tag) {
    // 模板下载地址
    const templateUrl = `direct:https://git.uino.com/microapp-template/${repo}.git`;
    // 调用 downloadGitRepo 方法将对应模板下载到指定目录
    await loading(
      "downloading template, please wait",
      downloadGitRepo,
      templateUrl,
      this.target, // 项目创建位置
      {
        clone: true,
        headers: { "PRIVATE-TOKEN": "45M-cQD9DTowegfL7RAt" },
      }
    );
  }
}

module.exports = Creator;
