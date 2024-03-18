"use client";

import { useEffect, useState } from "react";

import { IArticle } from "Article";
import { fetchArticles } from "@/services/articles.service";
import Loading from "../ui/loading";

import ArticleItem from "./article-item";

export default function Articles() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [articles, setArticles] = useState<IArticle[]>();

  const fetchStaticArticles = async () => {
    const { data, error } = await fetchArticles();

    if (error) {
      setFetchError("Could not fetch the Articles");
      setArticles(null);
      console.log(error);
    }

    if (data?.length) {
      const fetchedArticles: IArticle[] = data.map((d) => ({
        ...d,
        honorific: d["article_titles"]?.["honorific"] as string,
      }));

      setArticles(fetchedArticles);
      setFetchError(null);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!articles?.length && !isLoading) {
      fetchStaticArticles();
    }
  }, [articles]);

  return (
    <>
      {fetchError && <p>{fetchError}</p>}
      {isLoading && <Loading />}
      {!!articles?.length &&
        articles.map((article) => (
          <ArticleItem
            key={article.id}
            article={article}
            imgSize={{ height: 360, width: "100%" }}
          />
        ))}
    </>
  );
}
