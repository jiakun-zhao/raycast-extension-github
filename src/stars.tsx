import { ActionPanel, Action, Icon, Image, List } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { ListError } from "./utils/components";
import { getOctokit } from "./utils";

export default function Command() {
  const { isLoading, data, error } = usePromise(async () => {
    return await getOctokit().paginate(getOctokit().activity.listReposStarredByAuthenticatedUser);
  });

  return (
    <List isLoading={isLoading}>
      {error ? (
        <ListError />
      ) : (
        data?.map((repo) => (
          <List.Item
            icon={{ source: repo.owner.avatar_url, mask: Image.Mask.Circle }}
            key={repo.full_name}
            title={repo.full_name}
            subtitle={{ value: repo.description }}
            accessories={[{ icon: Icon.Star, text: repo.stargazers_count.toString() }]}
            actions={
              <ActionPanel>
                <Action.OpenInBrowser url={repo.html_url} />
              </ActionPanel>
            }
          />
        ))
      )}
    </List>
  );
}
