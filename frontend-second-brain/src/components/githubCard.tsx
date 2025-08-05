

const GitHubCard = ({ repoUrl }: { repoUrl: string }) => {
  const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) return null;

  const [_, owner, repo] = match;
  const ogImage = `https://opengraph.githubassets.com/1/${owner}/${repo}`;

  return (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block max-w-full overflow-hidden rounded-md transition border"
    >
      <img
        src={ogImage}
        alt={`${owner}/${repo} GitHub Preview`}
        className="w-full h-auto object-cover"
      />
    </a>
  );
};


export default GitHubCard;
