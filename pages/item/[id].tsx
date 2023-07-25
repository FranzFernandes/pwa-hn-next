import Page from '../../components/page'
import Item from '../../components/item'
import { useRouter } from 'next/router'
import { useComments, useStory } from '../../lib/get-stories'

export default function ItemPage() {
  const router = useRouter();

  return (
    <Page>
      <Item itemId={Number(router.query.id)} />
    </Page>
  )
}
