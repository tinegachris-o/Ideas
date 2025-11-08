import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  queryOptions,
  useSuspenseQuery,
  useMutation,
} from "@tanstack/react-query";
//import api from "@/lib/axios";
//import type { Idea } from "../../../types";
import { fetchIdea, deleteIdea } from "../../../api/ideas";
const ideaQueryOptions = (ideaId: string) =>
  queryOptions({
    queryKey: ["idea", ideaId],
    queryFn: () => fetchIdea(ideaId),
  });
export const Route = createFileRoute("/ideas/$ideaId/")({
  component: IdeaDetailsPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId));
  },
});

function IdeaDetailsPage() {
  const { ideaId } = Route.useParams();
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId));
  const navigate = useNavigate();
  const { isPending, mutateAsync: deleteMutate } = useMutation({
    mutationFn: () => deleteIdea(ideaId),
    onSuccess: () => {
      navigate({ to: "/ideas" });
    },
  });
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this idea?"
    );
    if (!confirmed) return;
    await deleteMutate();
  }
  return (
    <div className="p-4">
      <Link to="/ideas" className="text-blue-500 underline mb-4">
        Back to Ideas
      </Link>
      <h2 className="text-2xl font-bold"> {idea.title}</h2>
      <p className="mt-2">{idea.description}</p>
      {/* edit Link */}

      <Link
        to="/ideas/$ideaId/edit"
        params={{ ideaId }}
        className="inline-block text-sm bg-yellow-500 hover:bg-yellow-600 text-white mt-4 mr-2 px-4 py-2 rounded transition"
      >
        Edit
      </Link>
      {/* delete Button */}
      <button
        disabled={isPending}
        onClick={handleDelete}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded transition hover:bg-red-800"
      >
        {isPending ? "Deleting..." : "Delete Idea"}
      </button>
    </div>
  );
}

export default IdeaDetailsPage;
