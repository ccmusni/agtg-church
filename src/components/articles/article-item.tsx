import { ChangeEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, ButtonGroup } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";

import { IArticle } from "Article";

import CustomCard from "../custom-card";
import { TArticleOnSaveProps } from "./articles-cms";
import ArticleItemAddEditModal from "./article-item-add-edit-modal";

const CDNURL =
  "https://yrrhmzptqtwwbvytrpjv.supabase.co/storage/v1/object/public/images/";

export default function ArticleItem({
  article,
  imgPreviewUrlSrc,
  imgSize,
  admin,
  onUploadImage,
  onSave,
  onDelete,
}: {
  article: IArticle;
  admin?: boolean;
  imgPreviewUrlSrc?: string;
  imgSize?: { width?: string | number; height?: string | number };
  onUploadImage?: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  onSave?: ({
    id,
    title,
    details,
    article_title_id,
    oldFileName,
  }: TArticleOnSaveProps) => void;
  onDelete?: (id: number) => void;
}) {
  const router = useRouter();
  const { id, img_file_name: imgFileName } = article;
  const [imgSrc, setImgSrc] = useState("/images/branches-template.jpg");
  const [openModal, setOpenModal] = useState(false);

  useMemo(() => {
    if (!!imgFileName) {
      setImgSrc(`${CDNURL}articles/${id}/${imgFileName}`);
    }
  }, [imgFileName]);

  const handleSave = ({
    title,
    details,
    article_title_id,
  }: Partial<TArticleOnSaveProps>) => {
    onSave({
      ...article,
      title,
      details,
      article_title_id,
      oldFileName: article.img_file_name,
    });
    handleClose();
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <CustomCard
      customClassName="m-4"
      title={article.title}
      details={article.details}
      imgSrc={imgSrc}
      imgSize={imgSize}
      horizontal={false}
    >
      {admin ? (
        <>
          <ButtonGroup>
            <Button className="w-full z-0" onClick={() => setOpenModal(true)}>
              Edit
            </Button>
            <Button
              className="w-full z-0"
              color="failure"
              onClick={() => onDelete(id)}
            >
              Delete
            </Button>
          </ButtonGroup>
          <ArticleItemAddEditModal
            article={article}
            imgSrc={imgPreviewUrlSrc || imgSrc}
            open={openModal}
            onUploadImage={onUploadImage}
            onSave={handleSave}
            onClose={handleClose}
          />
        </>
      ) : (
        !!article.read_more_url && (
          <Button onClick={() => router.push(`/article/${article.id}`)}>
            Read more
            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )
      )}
    </CustomCard>
  );
}
