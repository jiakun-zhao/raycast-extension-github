import { List } from "@raycast/api";

export function ListError() {
  return (
    <List.EmptyView icon="😢" title="Something went wrong..." description="Check the network or try again later..." />
  );
}
