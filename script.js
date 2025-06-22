// Substitua 'SUA_CHAVE_API' pela sua chave de API do Steam
const STEAM_API_KEY = '8F32F488449461E06E0453114607F55E';

// Substitua 'SEU_STEAM_ID' pelo seu Steam ID numérico
const MY_STEAM_ID = 'caddak';

// Função para buscar os jogos do usuário
function fetchSteamGames() {
    const apiUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=8F32F488449461E06E0453114607F55E&steamid=76561198075268613&format=json`;

fetch(apiUrl)
    .then(response => {
        console.log("Resposta da API:", response);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Dados recebidos:", data);
        const gamesList = document.getElementById('gamesList');
        gamesList.innerHTML = ''; // Limpa a lista anterior

        if (!data.response || !data.response.games || data.response.game_count === 0) {
            gamesList.innerHTML = '<li>Nenhum jogo encontrado.</li>';
            return;
        }

        data.response.games.forEach(game => {
            const listItem = document.createElement('li');
            listItem.textContent = game.name;
            gamesList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar jogos:', error);
        alert("Ocorreu um erro ao buscar os jogos. Verifique o console para mais detalhes.");
    });
}