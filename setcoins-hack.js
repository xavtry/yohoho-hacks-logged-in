/*  Coin setter – works on any host that fulfils the two conditions above */
(async () => {
    const sid = localStorage.sessionId;
    if (!sid) return alert('No session id found – reload the game first.');

    const raw = prompt('Set your coins to:');
    const coins = Number(raw);
    if (!Number.isFinite(coins) || coins < 0)
        return alert('Positive number required.');

    const api = ep => `https://s.${location.hostname}/${ep}?s=${sid}`;

    /* fetch current save */
    const login = await fetch(api('login'));
    if (!login.ok) return alert('Could not reach /login endpoint.');
    const stats = await login.json();          // server already returns JSON

    /* patch only the coin field */
    stats.coinsOwned = coins;

    /* push back */
    const save = await fetch(api('save'), {
        method : 'POST',
        body   : JSON.stringify(stats),
        headers: { 'Content-Type': 'application/json' }
    });
    if (!save.ok) return alert('Save failed – try again.');

    alert('Coins updated – reloading…');
    location.reload();
})();
