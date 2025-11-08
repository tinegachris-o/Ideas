import { createFileRoute } from "@tanstack/react-router";
//import { Link } from "@tanstack/react-router";
//import api from "@/lib/axios";
//import type { Idea } from "../../types";

import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
///
import { fetchIdeas } from "../../api/ideas";
import IdeaCard from "@/components/ideaCard";
const ideasQueryOptions = () =>
  queryOptions({
    queryKey: ["ideas"],
    queryFn:  fetchIdeas,
  });
export const Route = createFileRoute("/ideas/")({
  component: IdeasPage,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideasQueryOptions());
  },
});

function IdeasPage() {
  //const { ideaId } = Route.useParams();

  const { data } = useSuspenseQuery(ideasQueryOptions());
  const ideas = [...data].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  //console.log("this are my ideas", ideas);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ideas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {ideas.map((idea) => (
     <IdeaCard key={idea.id} idea={idea}  />
        ))}
      </div>
    </div>
  );
}
