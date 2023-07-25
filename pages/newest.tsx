import React from "react";
import Page from "../components/page";
import { useStories, useStory } from "../lib/get-stories";
import Stories from "../components/stories";
import { useRouter } from "next/router";

export default function Newest() {
  const router = useRouter();
  const page = Number(router.query.page ?? 1);
  const stories = useStories("newstories", { page });
  return (
    <Page>
      {stories.isLoading ? (
        <p>loading stories...</p>
      ) : (
        <Stories stories={stories.data.data} />
      )}
    </Page>
  );
}
