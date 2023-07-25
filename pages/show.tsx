import { useRouter } from 'next/router'
import Page from '../components/page'
import Stories from '../components/stories'
import getStories, { useStories } from '../lib/get-stories'

export default function Show() {
  const router = useRouter();
  const page = Number(router.query.page ?? 1);
  const stories = useStories("showstories", { page });
  return (
    <Page>
      {stories.isLoading ? (
        <p>loading stories...</p>
      ) : (
        <Stories stories={stories.data.data} />
      )}
    </Page>
  )
}
