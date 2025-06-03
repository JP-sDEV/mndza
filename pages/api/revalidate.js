export const config = {
  api: {
    bodyParser: true, // use default JSON parser for Strapi webhook
  },
};

export default async function handler(req, res) {
  console.log("Incoming revalidate request");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const { model, entry } = req.body;

  if (!model || !entry) {
    return res.status(400).json({ message: "Missing model or entry" });
  }

  try {
    const pathsToRevalidate = ["/"]; // rebuild home page by default

    if (model === "project" && entry.uuid) {
      pathsToRevalidate.push("/projects"); // list page
      pathsToRevalidate.push(`/projects/${entry.uuid}`); // detail page
    }

    // Example: handle service updates if needed
    if (model === "service" && entry.uuid) {
      pathsToRevalidate.push("/services");
      pathsToRevalidate.push(`/services/${entry.uuid}`);
    }

    if (pathsToRevalidate.length === 0) {
      return res.status(400).json({ message: "No valid paths to revalidate" });
    }

    for (const path of pathsToRevalidate) {
      console.log(`Revalidating: ${path}`);
      await res.revalidate(path);
    }

    return res.json({ revalidated: true, paths: pathsToRevalidate });
  } catch (err) {
    console.error("Revalidation error:", err);
    return res
      .status(500)
      .json({ message: "Error revalidating", error: err.message });
  }
}
