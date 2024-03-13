import { ReactNode } from "react";
import { Card, CustomFlowbiteTheme } from "flowbite-react";
import Image from "next/image";

const customTheme: CustomFlowbiteTheme["card"] = {
  root: {
    children: "flex flex-col h-full justify-between gap-4 p-6",
  },
};

export default function CustomCard({
  customClassName,
  title,
  details,
  imgSrc,
  imgAtl,
  children,
  horizontal = false,
}: {
  customClassName?: string;
  title?: string;
  details?: string;
  imgSrc?: string;
  imgAtl?: string;
  children?: ReactNode;
  horizontal?: boolean;
}) {
  return (
    <Card
      className={`${customClassName} max-w-sm w-full h-50`}
      renderImage={() =>
        !!imgSrc ? (
          <Image
            className="w-full"
            width={355}
            height={240}
            src={imgSrc}
            alt={imgAtl || title}
            style={{
              height: 240,
              minHeight: 240,
              borderTopLeftRadius: "0.5rem",
              borderTopRightRadius: "0.5rem",
            }}
          />
        ) : (
          <></>
        )
      }
      theme={customTheme}
      horizontal={horizontal}
    >
      <>
        {title && details && (
          <div>
            {title && (
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {title}
              </h5>
            )}

            {details && (
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {details}
              </p>
            )}
          </div>
        )}
        {children}
      </>
    </Card>
  );
}
