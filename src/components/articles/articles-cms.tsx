"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { HiOutlinePlus } from "react-icons/hi";

import { IArticle } from "Article";
import Loading from "@/components/ui/loading";
import CustomCard from "../custom-card";
import {
  fetchArticles,
  addUpdateArticle,
  deleteArticle,
} from "@/services/articles.service";
import ArticleItem from "./article-item";
import ArticleItemAddEditModal from "./article-item-add-edit-modal";

export type TArticleOnSaveProps = {
  id?: number;
  title: string;
  details: string;
  article_title_id: string | number;
  oldFileName?: string;
};

export default function ArticlesCms() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [articles, setArticles] = useState<IArticle[]>();
  const [file, setFile] = useState<File>();
  const [imgPreviewUrlSrc, setImgPreviewUrlSrc] = useState("");
  const [openModal, setOpenModal] = useState(false);

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

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const newFile = e.target.files[0];

    setFile(newFile);
    setImgPreviewUrlSrc(URL.createObjectURL(newFile));
  };

  const handleSave = async ({
    id,
    title,
    details,
    article_title_id,
    oldFileName,
  }: TArticleOnSaveProps) => {
    setIsLoading(true);

    const { error } = await addUpdateArticle(
      id,
      title,
      details,
      article_title_id,
      oldFileName,
      file
    );

    if (!error) {
      setImgPreviewUrlSrc("");
      fetchStaticArticles();
    }
  };

  const handleDelete = (id: number) => {
    setIsLoading(true);

    const status = deleteArticle(id);

    status.finally(() => {
      fetchStaticArticles();
    });
  };

  return (
    <>
      {fetchError && <p>{fetchError}</p>}
      {isLoading && <Loading />}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
        <CustomCard customClassName="mb-4">
          <Button
            color="gray"
            className="h-full w-full border-0"
            onClick={() => setOpenModal(true)}
          >
            <HiOutlinePlus className="h-full w-full text-5xl" />
          </Button>
        </CustomCard>
        {!!articles?.length &&
          articles.map((article) => (
            <ArticleItem
              key={article.id}
              article={article}
              admin
              imgPreviewUrlSrc={imgPreviewUrlSrc}
              imgSize={{ height: 280, width: "100%" }}
              onUploadImage={handleUploadImage}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          ))}
      </div>
      {openModal && (
        <ArticleItemAddEditModal
          imgSrc={imgPreviewUrlSrc}
          open={openModal}
          onUploadImage={handleUploadImage}
          onSave={({ title, details, article_title_id }) => {
            handleSave({ title, details, article_title_id });
            setOpenModal(false);
          }}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
}
