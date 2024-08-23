import type { InferEntrySchema } from "astro:content";
import type { Recipes } from "../pages/[lang]/index.astro";

import { useState } from "react";
import Fuse, { type IFuseOptions } from "fuse.js";

const fuseOptions: IFuseOptions<unknown> = {
  keys: ["data.title", "data.tags"],
  includeMatches: true,
  minMatchCharLength: 2,
  threshold: 0.5,
};

const dateOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

type Recipe = {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: InferEntrySchema<"recipe">;
};

type SearchProps = {
  searchList: Recipes;
};

export const Search: React.FC<SearchProps> = ({ searchList }) => {
  const [query, setQuery] = useState("");

  const fuse = new Fuse<Recipe>(searchList, fuseOptions);

  const recipes = fuse.search(query).map((result) => result.item);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          placeholder="Search..."
        />
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {query.length >= 2
          ? recipes.map(({ id, data, slug }) => (
              <a key={id} href={slug.split("/")[1].toString()}>
                <div className="flex h-full flex-col overflow-hidden rounded shadow-lg">
                  <div className="relative">
                    <img
                      className="h-full w-full object-cover"
                      src={data.thumbnail.src}
                      alt={data.thumbnail.alt}
                      width={0}
                      height={0}
                    />
                    <div className="absolute bottom-0 left-0 right-0 top-0 bg-gray-900 opacity-25 transition duration-300 hover:bg-transparent"></div>
                  </div>
                  <div className="mb-auto px-6 py-4">
                    <div>
                      <h2>{data.title}</h2>
                    </div>
                    <p className="text-sm text-gray-500">{data.description}</p>
                  </div>
                  <div className="flex flex-row items-center justify-between bg-gray-100 px-6 py-3">
                    <span className="font-regular mr-1 flex flex-row items-center py-1 text-xs text-gray-900">
                      <time dateTime={data.date.toISOString()}>
                        {data.date.toLocaleDateString(
                          slug.split("/")[0],
                          //   @ts-ignore
                          dateOptions,
                        )}
                      </time>
                    </span>

                    <div className="font-regular flex flex-row items-center py-1 text-xs text-gray-900">
                      {data.tags.map((tag, i) => (
                        <div key={i} className="mr-1">
                          <span className="rounded-sm bg-slate-200 px-3 py-1">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            ))
          : searchList.map(({ id, data, slug }) => (
              <a key={id} href={slug.split("/")[1].toString()}>
                <div className="flex h-full flex-col overflow-hidden rounded shadow-lg">
                  <div className="relative">
                    <img
                      className="h-full w-full object-cover"
                      src={data.thumbnail.src}
                      alt={data.thumbnail.alt}
                      width={0}
                      height={0}
                    />
                    <div className="absolute bottom-0 left-0 right-0 top-0 bg-gray-900 opacity-25 transition duration-300 hover:bg-transparent"></div>
                  </div>
                  <div className="mb-auto px-6 py-4">
                    <div>
                      <h2>{data.title}</h2>
                    </div>
                    <p className="text-sm text-gray-500">{data.description}</p>
                  </div>
                  <div className="flex flex-row items-center justify-between bg-gray-100 px-6 py-3">
                    <span className="font-regular mr-1 flex flex-row items-center py-1 text-xs text-gray-900">
                      <time dateTime={data.date.toISOString()}>
                        {data.date.toLocaleDateString(
                          slug.split("/")[0],
                          //   @ts-ignore
                          dateOptions,
                        )}
                      </time>
                    </span>

                    <div className="font-regular flex flex-row items-center py-1 text-xs text-gray-900">
                      {data.tags.map((tag, i) => (
                        <div key={i} className="mr-1">
                          <span className="rounded-sm bg-slate-200 px-3 py-1">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            ))}
      </div>
    </>
  );
};
