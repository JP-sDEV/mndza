export function normalizeMetadata(response) {
  try {
    const entry = response?.data?.[0];
    if (!entry) return { error: "No data found", description: "", tags: [] };

    const description = entry.description || "";
    const tags = (entry.tags || []).map((tag) => tag.name);

    return {
      error: null,
      description,
      tags,
    };
  } catch (e) {
    return {
      error: "Unexpected error while processing response",
      description: "",
      tags: [],
    };
  }
}
