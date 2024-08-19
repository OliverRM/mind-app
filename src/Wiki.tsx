import { useNavigate } from "react-router-dom";
import TitleBar from "./TitleBar";
import { useWiki } from "./dataSource";

const Wiki = () => {
  const navigate = useNavigate();
  const wikiQuery = useWiki();

  if (wikiQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (wikiQuery.error || !wikiQuery.data) {
    return <div>Error fetching wiki data</div>;
  }

  return (
    <div className="flex h-full flex-col">
      <TitleBar className="shrink-0" query={wikiQuery}>
        Wiki
      </TitleBar>

      <div className="grow overflow-y-scroll bg-white">
        {wikiQuery.data.articles.map((article) => (
          <div
            key={article.id}
            className="flex h-20 flex-col justify-center border-b border-gray-300 px-4 first:border-t"
            onClick={() => navigate(`/wiki/${article.id}`, { state: article })}
          >
            <div className="line-clamp-1 text-sm">{article.title}</div>
            <div className="line-clamp-2 text-sm text-gray-500">
              {article.subtitle}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wiki;
