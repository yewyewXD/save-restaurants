// import { request } from "@octokit/request";

// const authRequest = request.defaults({
//   headers: {
//     authorization: `token ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
//   },
// });

// export function createRepo({ repoName }) {
//   const authRequest = request.defaults({
//     headers: {
//       authorization: `token ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
//     },
//   });
//   return authRequest("POST /user/repos", {
//     name: repoName,
//     private: true,
//   });
// }

// export function addRepoContent({ repoName, fileText, fileName }) {
//   return authRequest(`PUT /repos/yewyewXD/${repoName}/contents/${fileName}`, {
//     owner: "yewyewXD",
//     repo: repoName,
//     path: fileName,
//     message: new Date(),
//     content: btoa(fileText),
//   });
// }
