import Page from "../components/page";
import Story from "../components/story";
import Comment from "../components/comment";
import CommentForm from "../components/comment-form";
import { useRouter } from "next/router";
import { useComments, useStory } from "../lib/get-stories";

const Item = ({ itemId = 0 }) => {
  console.log("called");
  const router = useRouter();
  const storyId = Number(router.query.id);
  const story = useStory(storyId);
  const comments = useComments(story.data?.data?.kids ?? []);

  return (
    <div className="item">
      <Story {...story} />

      <div className="form">
        <CommentForm />
      </div>

      <div className="comments">
        {comments.data ? (
          comments.data.map((comment) => <Comment key={comment.id} {...comment} />)
        ) : (
          <div className="loading">Loading…</div>
        )}
      </div>

      <style jsx>{`
        .item {
          padding: 10px 29px;
        }

        .form {
          padding: 15px 0;
        }

        .loading {
          font-size: 13px;
        }

        .comments {
          padding: 10px 0 20px;
        }

        @media (max-width: 750px) {
          .item {
            padding: 8px 0px;
          }
        }
      `}</style>
    </div>
  );
};

export default Item;
