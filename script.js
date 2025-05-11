const GITHUB_USERNAME = 'Android-Artisan';
const container = document.getElementById('repo-container');

async function fetchRepos() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
    const repos = await res.json();

    repos.forEach(repo => {
      const card = document.createElement('div');
      card.className = 'repo-card';
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description ? repo.description : 'No description available.'}</p>
      `;
      card.onclick = () => {
        window.open(repo.html_url, '_blank');
      };
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = '<p>Failed to load repositories.</p>';
    console.error(err);
  }
}

fetchRepos();

