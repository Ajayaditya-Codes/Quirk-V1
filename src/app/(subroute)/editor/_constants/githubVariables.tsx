export const GithubVariables = [
  // Issue Event
  "issue.id",
  "issue.number",
  "issue.title",
  "issue.body",
  "issue.state",
  "issue.assignee",
  "issue.labels",
  "issue.created_at",
  "issue.updated_at",
  "issue.user",

  // Repository Information
  "repository.name",
  "repository.owner",
  "repository.url",

  // Sender Information
  "sender.login",
  "sender.id",
  "sender.type",

  // Push Event
  "before",
  "after",
  "commits[0].id", // Access first commit's id
  "commits[0].message", // Access first commit's message
  "commits[0].timestamp", // Access first commit's timestamp
  "commits[0].author.name", // Access first commit's author name
  "commits[0].author.email", // Access first commit's author email
  "commits[0].url", // Access first commit's URL
  "commits[0].added", // Access first commit's added files
  "commits[0].removed", // Access first commit's removed files
  "commits[0].modified", // Access first commit's modified files

  // Pusher Information
  "pusher.name",
  "pusher.email",
];
