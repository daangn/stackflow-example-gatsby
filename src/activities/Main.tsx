import { ActivityComponentType, useActivityPreloadRef } from "@stackflow/react";
import React from "react";

import IconBell from "../assets/IconBell";
import IconExpandMore from "../assets/IconExpandMore";
import IconSearch from "../assets/IconSearch";
import IconSettings from "../assets/IconSettings";
import BottomTab from "../components/BottomTab";
import FeedCard from "../components/FeedCard";
import Layout from "../components/Layout";
import { readPreloadData } from "../lib/readPreloadData";
import * as css from "./Main.css";

const Main: ActivityComponentType = () => {
  const preloadRef = useActivityPreloadRef<{ key: string }>();
  const data = readPreloadData<Queries.MainTemplateQueryQuery>(preloadRef);

  const appBarLeft = () => (
    <div className={css.appBarLeft}>
      Woolston
      <div className={css.appBarLeftIcon}>
        <IconExpandMore />
      </div>
    </div>
  );

  const appBarRight = () => (
    <div className={css.appBarRight}>
      <IconSearch />
      <IconSettings />
      <IconBell />
    </div>
  );

  return (
    <Layout
      appBar={{
        appendLeft: appBarLeft,
        appendRight: appBarRight,
      }}
    >
      <div className={css.wrapper}>
        <div className={css.scrollable}>
          {data.allMarkdownRemark.nodes.map((node) => (
            <FeedCard
              key={String(node.frontmatter!.id!)}
              articleId={String(node.frontmatter!.id!)}
              daysAgo={node.frontmatter!.daysAgo!}
              price={node.frontmatter!.price!}
              region={node.frontmatter!.regionName!}
              title={node.frontmatter!.title!}
            />
          ))}
        </div>
        <div className={css.bottom}>
          <BottomTab />
        </div>
      </div>
    </Layout>
  );
};

export default Main;
