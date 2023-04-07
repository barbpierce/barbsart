import { GraphQLClient, gql } from "graphql-request";

export default async (req, res) => {
  const title = req.body;

  try {
    const url = process.env.ENDPOINT;
    const graphQLClient = new GraphQLClient(url, {
      header: {
        Authorization: process.env.GRAPH_CMS_TOKEN,
      },
    });

    const query = gql`
      mutation ($title: String!) {
        updateArtPiece(where: { title: $title }, data: { sold: true }) {
          title
        }
        publishArtPiece(where: { title: $title }) {
          title
        }
      }
    `;
    const variables = {
      title,
    };
    const data = await graphQLClient.request(query, variables);

    res.status(200).json({ body: data });
  } catch (error) {
    res.status(500).json({ body: error.message });
  }
};
