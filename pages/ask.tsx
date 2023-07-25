import { useRouter } from 'next/router'
import Page from '../components/page'
import Stories from '../components/stories'
import { useStories } from '../lib/get-stories'

export default function Ask() {
  const router = useRouter();
  const page = Number(router.query.page ?? 1);
  const storyIds = useStories("askstories", { page });
  const offset = (page - 1) * 30;
  return (
    <Page>
      {storyIds.isLoading ? (
        <p>loading...</p>
      ) : (
        <Stories page={page} offset={offset} stories={storyIds.data.data} />
      )}
    </Page>
  )
}
