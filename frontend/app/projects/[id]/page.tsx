import ProjectDetailPage from "../../../components/pages/ProjectDetailPage";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <ProjectDetailPage projectId={id} />;
}
