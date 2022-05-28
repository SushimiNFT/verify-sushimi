import request, { gql } from "graphql-request";
import useSWR from "swr";

const SUBGRAPH_API = "https://api.thegraph.com/subgraphs/name/lufycz/sushimi";

const userQuery = gql`
  query UserQuery($id: String!) {
    user(id: $id) {
      id
      nftCount
    }
  }
`;

export default function useSushismiCount(address: string | undefined) {
  const { data } = useSWR(address ? ["sushimiCount", address] : null, () =>
    request(SUBGRAPH_API, userQuery, { id: address!.toLowerCase() })
  );

  if (!data) return undefined;
  if (!data.user) return 0;
  return Number(data.user.nftCount);
}
