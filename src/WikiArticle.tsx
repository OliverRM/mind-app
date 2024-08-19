import { useLocation, useParams } from "react-router-dom";
import TitleBar from "./TitleBar";
import { useWikiArticle } from "./dataSource";

const WikiArticle = () => {
  const location = useLocation();
  const articleId = useParams().articleId as string;
  const articlePreview: { title: string } | null = location.state;
  const query = useWikiArticle(articleId);

  return (
    <div className="flex h-full flex-col">
      <TitleBar className="shrink-0" query={query}>
        {query.data?.title || articlePreview?.title || "Wiki"}
      </TitleBar>
      {query.data ? (
        <iframe srcDoc={query.data.content} className="grow bg-white" />
      ) : (
        <div>
          Preview
          <br />
          {JSON.stringify(articlePreview, null, 2)}
        </div>
      )}
    </div>
  );
};

export default WikiArticle;
