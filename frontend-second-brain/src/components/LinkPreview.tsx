// components/LinkPreviewCard.tsx

import { useEffect, useState } from "react";
import { getLinkPreview, PreviewData } from "link-preview-js";

type Props = {
  url: string;
};

export const LinkPreviewCard = ({ url }: Props) => {
  const [preview, setPreview] = useState<PreviewData | null>(null);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const data = await getLinkPreview(url);
        setPreview(data);
      } catch (err) {
        console.error("Preview fetch failed:", err);
      }
    };

    fetchPreview();
  }, [url]);

  if (!preview) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block border rounded-xl overflow-hidden shadow hover:shadow-lg transition max-w-full"
    >
      {preview.images?.[0] && (
        <img
          src={preview.images[0]}
          alt={preview.title || "Link preview"}
          className="w-full object-cover max-h-60"
        />
      )}
      <div className="p-4 bg-white">
        <h3 className="font-semibold text-lg truncate">{preview.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {preview.description}
        </p>
        <span className="block text-xs text-gray-500 mt-2 truncate">
          {url}
        </span>
      </div>
    </a>
  );
};
