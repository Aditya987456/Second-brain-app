import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../components/card"; // reuse

export function SharedBrain() {
  const { sharedId } = useParams();
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/share/${sharedId}`)
      .then(res => setContents(res.data.contents))
      .catch(() => alert("Brain not found"));
  }, [sharedId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🧠 Shared Brain</h1>

      {contents.length === 0 ? (
        <p>No content to show</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contents.map(content => (
            <Card
              key={content._id}
              {...content}
              isReadOnly={true} // Optional prop to disable delete/edit
            />
          ))}
        </div>
      )}
    </div>
  );
}
