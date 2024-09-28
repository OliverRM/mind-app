import { QueryStateIndicator } from "./InfoScreen";
import TitleBar from "./TitleBar";
import { useWiki } from "./dataSource";

const Wiki = () => {
  const wikiQuery = useWiki();

  if (!wikiQuery.data)
    return (
      <div className="flex h-full flex-col">
        <TitleBar className="shrink-0" query={wikiQuery}>
          Infos
        </TitleBar>
        <QueryStateIndicator className="grow bg-white" query={wikiQuery} />
      </div>
    );

  return (
    <div className="flex h-full flex-col">
      <TitleBar className="shrink-0" query={wikiQuery}>
        Wiki
      </TitleBar>

      <div className="grow overflow-y-scroll bg-white">
        {wikiQuery.data.map((article) => (
          <a
            key={article.id}
            className="block border-b border-neutral-300 px-4 py-6 first:border-t"
            href={article.url}
            target="_blank"
          >
            {article.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Wiki;
