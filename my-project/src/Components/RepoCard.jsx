import { AiFillStar } from 'react-icons/ai';
import { BiGitRepoForked } from 'react-icons/bi';
import { VscIssues } from 'react-icons/vsc';

const LANGUAGE_COLORS = {
  JavaScript: '#E8A33D',
  TypeScript: '#5B8DEF',
  Python: '#58C77B',
  Go: '#5BC0EB',
  Rust: '#D97757',
  Java: '#E07A5F',
  'C++': '#9B7EDE',
};

function formatCount(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

const RepoCard = ({ repo }) => {
  const dotColor = LANGUAGE_COLORS[repo.language] || '#4b5580';

  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noreferrer"
      className="block rounded-xl p-5 no-underline transition-all"
      style={{ background: '#0f0f1a', border: '0.5px solid #2d2d5e' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = '#7c3aed'}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#2d2d5e'}
    >
      <div className="flex items-center gap-2 mb-3">
        <img src={repo.avatar} alt={repo.owner} className="w-6 h-6 rounded-md" />
        <span className="font-mono text-sm font-medium" style={{ color: '#818cf8' }}>
          {repo.fullName}
        </span>
      </div>

      <p
        className="font-mono text-xs mb-3 overflow-hidden"
        style={{ color: '#94a3b8', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
      >
        {repo.description || 'No description provided.'}
      </p>

      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {repo.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="font-mono text-xs px-2 py-0.5 rounded-full"
              style={{ color: '#818cf8', background: '#1a1a3e', border: '0.5px solid #2d2d5e' }}
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div
        className="flex items-center gap-4 font-mono text-xs pt-3"
        style={{ color: '#4b5580', borderTop: '0.5px solid #2d2d5e' }}
      >
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: dotColor }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <AiFillStar style={{ color: '#f59e0b' }} />
          {formatCount(repo.stars)}
        </span>
        <span className="flex items-center gap-1">
          <BiGitRepoForked />
          {formatCount(repo.forks)}
        </span>
        <span className="flex items-center gap-1">
          <VscIssues />
          {repo.openIssues}
        </span>
      </div>
    </a>
  );
};

export default RepoCard;