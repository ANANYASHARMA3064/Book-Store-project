const GITHUB_API = 'https://api.github.com';

const headers = {
  Accept: 'application/vnd.github+json',
  ...(import.meta.env.VITE_GITHUB_TOKEN && {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  }),
};

export async function searchRepos(keyword) {
  if (!keyword.trim()) return [];

  const q = `${keyword} stars:>100 archived:false`;
  const url = `${GITHUB_API}/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=24`;

  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`GitHub search failed (${res.status})`);

  const data = await res.json();
  return data.items.map((item) => ({
    id: item.id,
    fullName: item.full_name,
    owner: item.owner.login,
    name: item.name,
    avatar: item.owner.avatar_url,
    description: item.description,
    language: item.language,
    stars: item.stargazers_count,
    forks: item.forks_count,
    openIssues: item.open_issues_count,
    url: item.html_url,
    topics: item.topics || [],
    updatedAt: item.updated_at,
  }));
}