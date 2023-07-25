import { BASE_API_URL } from "./db";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default async function getStories(
  type = "topstories",
  { page = 1, max = 30 } = {}
) {
  const stories = await axios.get(`${BASE_API_URL}/${type}.json`);
  return stories;
}

export const getStory = async (id) => {
  try {
    const story = await axios.get(`${BASE_API_URL}/item/${id}.json`);
    return story;
  } catch (error) {
    console.log("Error while getting a story.");
  }
};

export const useStory = (id) =>
  useQuery({
    queryKey: ["story", id],
    queryFn: async () => {
      const data = await getStory(id);
      return data;
    },
  });

export const useStories = (type, params) =>
  useQuery({
    queryKey: ["stories", type, params],
    queryFn: async () => {
      const data = await getStories(type, params);
      return data;
    },
  });

  const fetchComments = async (ids) => {
    return Promise.all(
      ids.map(async (id) => {
        const data = (await axios.get(`${BASE_API_URL}/item/${id}.json`)).data;
        return {
          id: data.id,
          user: data.by || null,
          text: data.text || '',
          date: new Date(data?.time * 1000).toISOString(),
          comments: await fetchComments(data.kids || []),
          commentsCount: data.descendants || 0,
        };
      })
    );
  }

export const useComments = (ids) =>{
  console.log(ids);
  return useQuery({
    enabled: Boolean(ids && !!ids.length),
    queryKey: ["comments", ids],
    queryFn: async () => {
      const data = await fetchComments(ids);
      return data;
    },
  });
}