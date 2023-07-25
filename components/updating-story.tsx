import { useStory } from '../lib/get-stories'
import Story from './story'

const UpdatingStory = (props) => {
  const story = useStory(props.storyId);

  if (story.isLoading) {
    return (
      <p>loading story...</p>
    )
  }
  return <Story {...story.data.data} />
}

export default UpdatingStory
