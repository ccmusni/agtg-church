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
  imgSize = { width: 360, height: 280 },
  children,
  horizontal = false,
}: {
  customClassName?: string;
  title?: string;
  details?: string;
  imgSrc?: string;
  imgAtl?: string;
  imgSize?: { width: number; height: number };
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
            width={horizontal ? imgSize.height : imgSize.width}
            height={horizontal ? imgSize.width : imgSize.height}
            src={imgSrc}
            alt={imgAtl || title}
            style={{
              maxHeight: horizontal ? imgSize.width : imgSize.height,
              maxWidth: horizontal ? imgSize.height : imgSize.width,
              borderTopLeftRadius: "0.5rem",
              borderTopRightRadius: horizontal ? "" : "0.5rem",
              borderBottomLeftRadius: horizontal ? "0.5rem" : "",
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
