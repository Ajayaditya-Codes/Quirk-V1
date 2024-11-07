const fetchWithCache = async (url: string) => {
  try {
    const response = await fetch(url, { cache: "force-cache" });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error: any) {
    console.error(error?.message);
    return null;
  }
};

export const githubProvider = fetchWithCache(
  "https://localhost:300/api/github/fetchRepos"
);
export const slackProvider = fetchWithCache(
  "https://localhost:300/api/slack/fetchData"
);
export const asanaProvider = fetchWithCache(
  "https://localhost:300/api/asana/fetchData"
);
