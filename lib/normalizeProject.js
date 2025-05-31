export function normalizeProject(strapiProject) {
  if (!strapiProject) return null;

  const {
    uuid,
    title,
    description,
    medias = [],
    createdAt,
    publishedAt,
  } = strapiProject;

  const mediaInfo = medias.map((media) => ({
    // id: media.id,
    // documentId: media.documentId,
    // name: media.name,
    url: media.url ?? media.file?.url ?? null,
    type: inferMediaType(media.url ?? media.file?.url ?? null),
    width: media.width || null,
    height: media.height || null,
    mime: media.file?.mime ?? null,
    // createdAt: media.createdAt,
    // updatedAt: media.updatedAt,
    // publishedAt: media.publishedAt,
  }));

  return {
    uuid,
    title,
    description,
    createdAt,
    publishedAt,
    medias: mediaInfo,
  };
}

function inferMediaType(url) {
  if (!url) return "unknown";
  if (url.includes("youtube")) return "youtube";
  if (url.match(/\.(mp4|mov|webm)$/)) return "video";
  if (url.match(/\.(jpg|jpeg|png|gif|webp)$/)) return "image";
  return "file";
}
