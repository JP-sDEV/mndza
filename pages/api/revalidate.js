export default async function handler(req, res) {
  console.log("Incoming revalidate request");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Check secret token for security
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const { path } = req.body;

  if (!path) {
    return res.status(400).json({ message: "Path is required" });
  }

  try {
    // Optionally validate that path matches allowed routes
    const allowedPaths = ["/projects", "/services", "/"];
    if (allowedPaths.includes(path) || path.startsWith("/projects/")) {
      console.log(`Revalidating request: ${path}`);
      await res.revalidate(path);
      return res.json({ revalidated: true, path });
    } else {
      console.log(`Revalidation Error: Path not allowed: ${path}`);
      return res.status(400).json({ message: `Path not allowed: ${path}` });
    }
  } catch (err) {
    console.log(`Revalidation Error: ${err}`);
    return res
      .status(500)
      .json({ message: "Error revalidating", error: err.message });
  }
}
