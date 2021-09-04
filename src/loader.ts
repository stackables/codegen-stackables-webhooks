import { parse } from 'graphql';
import { GraphQLClient, gql } from 'graphql-request'

export default async function (endpoint: string) {

  const graphQLClient = new GraphQLClient(endpoint)

  const query = gql`
    query CodeGenWebhooks {
      Webhook {
        list {
          name
          query
          entity: entity2 {
            id
          }
        }
      }
    }
  `

  const data = await graphQLClient.request(query)
  const fragments = data.Webhook.list;

  return parse(fragments.map((f: any) => `fragment ${f.name} on ${f.entity.id} @register ${f.query}`).join('\n'));
};