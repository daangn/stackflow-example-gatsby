import { graphql, PageProps } from "gatsby";
import * as React from "react";

const MainTemplate: React.FC<PageProps> = () => null;

export const query = graphql`
  query MainTemplateQuery {
    allMarkdownRemark {
      nodes {
        frontmatter {
          id
          title
          daysAgo
          regionName
          price
        }
      }
    }
  }
`;

export default MainTemplate;
