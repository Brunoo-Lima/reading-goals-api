interface IPageMetaProps {
  title: string;
  description: string;
  image?: string;
}

export function PageMeta({ title, description, image }: IPageMetaProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
    </>
  );
}
