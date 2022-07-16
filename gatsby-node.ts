import type { CreatePagesArgs } from "gatsby";
import path from "path";

const gql = String.raw;

export async function createPages({
  actions: { createPage },
  graphql,
}: CreatePagesArgs) {
  const MainTemplate = path.resolve("./src/templates/MainTemplate.tsx");
  const ArticleTemplate = path.resolve("./src/templates/ArticleTemplate.tsx");

  createPage({
    path: "/",
    component: MainTemplate,
    context: {},
  });

  const { data } = (await graphql(gql`
    query {
      allMarkdownRemark {
        nodes {
          frontmatter {
            id
            title
            daysAgo
            regionName
          }
        }
      }
    }
  `)) as any;

  data.allMarkdownRemark.nodes.forEach((node: any) => {
    createPage({
      path: `/articles/${node.frontmatter.id}`,
      component: ArticleTemplate,
      context: {
        articleId: node.frontmatter.id,
      },
    });
  });
}
