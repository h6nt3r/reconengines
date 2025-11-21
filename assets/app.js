document.addEventListener('DOMContentLoaded', function() {
  const generateBtn = document.querySelector('.btn-outline-warning');
  const resetBtn = document.querySelector('.btn-outline-danger');
  const engineSelect = document.getElementById('engine');
  const domainInput = document.getElementById('domain');
  const dorkLinkInput = document.getElementById('dorkLink');
  const dorkTypeSelect = document.getElementById('dorkType');
  const dorkList = document.getElementById('dork-list');
  const clearDomainBtn = document.getElementById('clear-domain');
  const clearDorkBtn = document.getElementById('clear-dorkLink');

  const links = {
    hunter: 'https://raw.githubusercontent.com/h6nt3r/collection_payloads/refs/heads/main/dorks/hunter-how.txt',
    google: 'https://raw.githubusercontent.com/h6nt3r/collection_payloads/refs/heads/main/dorks/google-dorks.txt',
    shodan: 'https://raw.githubusercontent.com/h6nt3r/collection_payloads/refs/heads/main/dorks/shodan-dorks.txt',
    fofa: 'https://raw.githubusercontent.com/h6nt3r/collection_payloads/refs/heads/main/dorks/fofa-dork.txt',
    hunter: 'https://raw.githubusercontent.com/h6nt3r/collection_payloads/refs/heads/main/dorks/hunter-how.txt',
    git: 'https://raw.githubusercontent.com/h6nt3r/collection_payloads/refs/heads/main/dorks/git-dorks.txt',
    censys: 'https://raw.githubusercontent.com/h6nt3r/collection_payloads/refs/heads/main/dorks/censys-dork.txt'
  };

  dorkTypeSelect.addEventListener('change', () => {
    const type = dorkTypeSelect.value;
    dorkLinkInput.value = links[type] || '';
  });

  clearDomainBtn.addEventListener('click', () => domainInput.value = '');
  clearDorkBtn.addEventListener('click', () => dorkLinkInput.value = '');

  generateBtn.addEventListener('click', () => {
    const engine = engineSelect.value;
    const domain = domainInput.value.trim();
    const dorkLink = dorkLinkInput.value.trim();
    if(!engine || !domain || !dorkLink){ alert('Please fill all fields!'); return; }

    fetch(dorkLink).then(r => r.text()).then(data => {
      const dorks = data.split('\n').filter(x => x.trim() !== '');
      dorkList.innerHTML = '';
      dorks.forEach(dork => {
        const replaced = dork.replace(/example\.com/gi, domain);
        const wrapper = document.createElement('div');
        wrapper.className = 'dork-item';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        const link = document.createElement('a');
        link.href = engine + encodeURIComponent(replaced);
        link.textContent = replaced;
        link.target = '_blank';
        link.addEventListener('click', () => checkbox.checked = true);
        wrapper.appendChild(checkbox);
        wrapper.appendChild(link);
        wrapper.addEventListener('click', e => { if(e.target.tagName !== 'A' && e.target.tagName !== 'INPUT'){ checkbox.checked = !checkbox.checked; } });
        dorkList.appendChild(wrapper);
      });
      dorkList.classList.remove('d-none');
    });
  });

  resetBtn.addEventListener('click', () => {
    engineSelect.value = '';
    domainInput.value = '';
    dorkLinkInput.value = '';
    dorkTypeSelect.value = '';
    dorkList.innerHTML = '';
    dorkList.classList.add('d-none');
  });
});