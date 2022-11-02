import "../activities/Article";

import { graphql, PageProps } from "gatsby";
import * as React from "react";

const ArticleTemplate: React.FC<PageProps> = () => null;

export const query = graphql`
  query ArticleTemplateQuery($articleId: Int!) {
    markdownRemark(frontmatter: { id: { eq: $articleId } }) {
      frontmatter {
        id
        title
        daysAgo
        regionName
        price
      }
      html
    }
    allMarkdownRemark {
      nodes {
        frontmatter {
          id
          price
          title
        }
      }
    }
  }
`;

export default ArticleTemplate;
