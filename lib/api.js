const axios = require("axios");

axios.defaults.headers.common["PRIVATE-TOKEN"] = "45M-cQD9DTowegfL7RAt";

// 拦截全局请求响应
axios.interceptors.response.use((res) => {
  return res.data;
});

/**
 * 获取模板
 * @returns Promise 仓库信息
 */
async function getRepo() {
  return axios.get("https://git.uino.com/api/v4/groups/5969/projects");
}

/**
 * 获取仓库下的版本
 * @param {string} repo 模板名称
 * @returns Promise 版本信息
 */
async function getTagsByRepo(repo) {
  return axios.get(`https://api.github.com/repos/zhurong-cli/${repo}/tags`);
}

module.exports = {
  getRepo,
  getTagsByRepo,
};
