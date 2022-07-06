import { useActivity, useActivityParams, useStack } from "@stackflow/react";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ArticleCard from "../components/ArticleCard";
import ArticleProfile from "../components/ArticleProfile";
import Layout from "../components/Layout";
import { readPreloadData } from "../lib/readPreloadData";
import * as css from "./Article.css";

export interface ArticleParams {
  articleId: string;
}
const Article: React.FC<ArticleParams> = () => {
  const activity = useActivity()
  const data = readPreloadData<Queries.ArticleTemplateQueryQuery>(activity.preloadRef)

  const imageUrl = `https://picsum.photos/800/800/?id=${data.markdownRemark!.frontmatter!.id!}`;

  return (
    <Layout>
      <div className={css.container}>
        <div className={css.image}>
          <div className={css.imageInner}>
            <LazyLoadImage
              src={imageUrl}
              effect="opacity"
              width="100%"
              height="100%"
            />
          </div>
        </div>
        <ArticleProfile />
        <div className={css.content}>
          <div className={css.title}>{data.markdownRemark?.frontmatter?.title}</div>
          <div className={css.subtitle}>Baby & Kids ∙ {data.markdownRemark?.frontmatter?.daysAgo} days ago</div>
          <div className={css.body} dangerouslySetInnerHTML={{ __html: data.markdownRemark!.html! }}/>
          <div className={css.subtitle}>1 chats ∙ 2 favorites ∙ 212 views</div>
        </div>
        <div className={css.section}>
          <div className={css.sectionTitle}>Other Items by Emila </div>
          <div className={css.recommenderGrid}>
            {data.allMarkdownRemark.nodes.map((node) => (
              <ArticleCard
                key={String(node.frontmatter!.id!)}
                articleId={String(node.frontmatter!.id!)}
                price={node.frontmatter!.price!}
                title={node.frontmatter!.title!}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Article;
