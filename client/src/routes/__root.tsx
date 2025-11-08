import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Link,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClient } from "@tanstack/react-query";
type RouterContext = {
  queryClient: QueryClient;
};
import Header from "@/components/Header";
export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    title: "ideaDrop -Your IdeaHub",
    meta: [
      {
        name: "description",
        content: "Share,explore, build and deploy startup Ideas",
      },
    ],
  }),
  component: RootLayout,
  notFoundComponent: NotFound,
});
function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <HeadContent />
      <Header />
      <main className="justify-center p-6">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
          <Outlet />
        </div>
      </main>
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </div>
  );
}
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 cursor-pointer text-green rounded-md hover:bg-blue-700 transition"
      >
        Go back home
      </Link>
    </div>
  );
}