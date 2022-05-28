import useSWR from "swr";

export default function useDiscordTag(id: string | undefined) {
  const { data } = useSWR(id ? ["discord-tag", id] : null, () =>
    fetch(`/api/discord/${id}`).then((data) => data.json())
  );

  return data?.name ?? undefined;
}
