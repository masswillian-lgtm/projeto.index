document.addEventListener('DOMContentLoaded', () => {
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const postId = post.dataset.id;
        const likeBtn = post.querySelector('.btn-like');
        const dislikeBtn = post.querySelector('.btn-dislike');
        const likeCount = likeBtn.querySelector('.count');
        const dislikeCount = dislikeBtn.querySelector('.count');

        // Carrega estado salvo ou inicia zerado
        let state = JSON.parse(localStorage.getItem(`post-${postId}`)) || {
            likes: 0,
            dislikes: 0,
            userVote: null // 'like', 'dislike' ou null
        };

        // Atualiza UI inicial
        updateUI();

        likeBtn.addEventListener('click', () => handleVote('like'));
        dislikeBtn.addEventListener('click', () => handleVote('dislike'));

        function handleVote(type) {
            if (state.userVote === type) {
                // Remove o voto se clicar no mesmo botão novamente
                state[type === 'like' ? 'likes' : 'dislikes']--;
                state.userVote = null;
            } else {
                // Se já votou no oposto, remove do contador oposto
                if (state.userVote) {
                    const opposite = state.userVote === 'like' ? 'likes' : 'dislikes';
                    state[opposite]--;
                }
                // Adiciona novo voto
                state[type === 'like' ? 'likes' : 'dislikes']++;
                state.userVote = type;
            }

            saveAndRender();
        }

        function updateUI() {
            likeCount.textContent = state.likes;
            dislikeCount.textContent = state.dislikes;
            likeBtn.classList.toggle('active', state.userVote === 'like');
            dislikeBtn.classList.toggle('active', state.userVote === 'dislike');
        }

        function saveAndRender() {
            localStorage.setItem(`post-${postId}`, JSON.stringify(state));
            updateUI();
        }
    });
});
