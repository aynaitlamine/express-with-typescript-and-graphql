import {graphql, GraphQLSchema} from "graphql";
import {Maybe} from "@graphql-tools/utils";

interface Options {
  schema: GraphQLSchema;
  source: string;
  variableValues?: Maybe<{[key: string]: any}>;
}

export const testGraphQLQuery = async ({
  schema,
  source,
  variableValues,
}: Options) => {
  return graphql({
    schema,
    source,
    variableValues,
  });
};
