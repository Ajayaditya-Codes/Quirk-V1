export type UserType = {
  Clerk_id: string;
  Username: string;
  Email: string;
  Credits: number;
  SlackAccessToken: string;
  AsanaAccessToken: string;
};

export type Log = {
  createdAt: string;
  LogMessage: string;
  WorkflowName: string;
  Success?: boolean | null;
};

export type Workflow = {
  WorkflowName: string;
  GitHubNode: GitHubNode;
  SlackNodes: SlackNode[];
  AsanaNode: AsanaNode[];
};

export type GitHubNode = {
  RepoName: string;
  ListenerType: string;
};

export type SlackNode = {
  Channel: string;
  Text: string;
};

export type AsanaNode = {
  ProjectIds: [string];
  TaskName: string;
  TasKNotes: string;
};
