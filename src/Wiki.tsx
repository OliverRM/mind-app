import TitleBar from "./TitleBar";
import { useWiki } from "./dataSource";

const Wiki = () => {
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
        {wikiQuery.data.map((article) => (
          <a
            key={article.id}
            className="flex h-20 flex-col justify-center border-b border-gray-300 px-4 first:border-t"
            href={article.url}
            target="_blank"
          >
            <div className="text-sm">{article.name}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Wiki;
