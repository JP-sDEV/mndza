export function normalizeProject(strapiProject) {
  if (!strapiProject) return null;

  const {
    uuid,
    title,
    description,
    medias = [],
    tools = [],
    createdAt,
    publishedAt,
  } = strapiProject;

  const mediaInfo = medias.map((media) => ({
    // id: media.id,
    // documentId: media.documentId,
    // name: media.name,
    url: media.url ?? media.file?.url ?? null,
    type: inferMediaType(media.url ?? media.file?.url ?? null),
    width: media.file?.formats?.large?.width || null,
    height: media.file?.formats?.large?.height || null,
    mime: media.file?.mime ?? null,
    // createdAt: media.createdAt,
    // updatedAt: media.updatedAt,
    // publishedAt: media.publishedAt,
  }));

  const toolsInfo = tools.map((tool) => ({
    name: tool.name ?? null,
  }));

  return {
    uuid,
    title,
    description,
    createdAt,
    publishedAt,
    medias: mediaInfo,
    tools: toolsInfo,
  };
}

function inferMediaType(url) {
  if (!url) return "unknown";
  if (url.includes("youtube")) return "youtube";
  if (url.match(/\.(mp4|mov|webm)$/)) return "video";
  if (url.match(/\.(jpg|jpeg|png|gif|webp)$/)) return "image";
  return "file";
}
