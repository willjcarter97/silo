import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../prismicio";
import { linkResolver, loadPrismicToolbar } from "../lib/prismicPreview";

// Prismic's "Preview" button opens this page. It works out which page the draft belongs to and goes there.
export default function Preview() {
  const navigate = useNavigate();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    loadPrismicToolbar();
    client
      .resolvePreviewURL({ linkResolver, defaultURL: "/" })
      .then((url) => navigate(url, { replace: true }))
      .catch((err) => {
        console.error("Prismic preview failed:", err);
        setFailed(true);
      });
  }, [navigate]);

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <p className="text-black text-lg">
        {failed ? "This preview link has expired. Click Preview in Prismic again." : "Loading preview..."}
      </p>
    </div>
  );
}
