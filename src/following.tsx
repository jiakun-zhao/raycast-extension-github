import { ActionPanel, Action, Image, List } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { ListError } from "./utils/components";
import { getOctokit } from "./utils";

export default function Command() {
  const { isLoading, data, error } = usePromise(async () => {
    return await getOctokit().paginate(getOctokit().users.listFollowedByAuthenticatedUser);
  });

  return (
    <List isLoading={isLoading}>
      {error ? (
        <ListError />
      ) : (
        data?.map((user) => (
          <List.Item
            icon={{ source: user.avatar_url, mask: Image.Mask.Circle }}
            key={user.login}
            title={user.login}
            actions={
              <ActionPanel>
                <Action.OpenInBrowser url={user.html_url} />
              </ActionPanel>
            }
          />
        ))
      )}
    </List>
  );
}
