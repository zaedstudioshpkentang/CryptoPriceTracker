fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
    .then(response => response.json())
    .then(data => {
        const cryptoUl = document.getElementById('crypto-ul');

        data.forEach(crypto => {
            const cryptoLi = document.createElement('li');
            const cryptoIcon = document.createElement('img');
            cryptoIcon.src = crypto.image;
            cryptoIcon.alt = crypto.name;
            cryptoIcon.classList.add('crypto-icon');
            
            const cryptoName = document.createElement('span');
            cryptoName.textContent = `${crypto.name} (${crypto.symbol}) - $${crypto.current_price}`;
            cryptoName.classList.add('crypto-name');
            
            const priceChange = document.createElement('span');
            const percentChange = crypto.price_change_percentage_24h.toFixed(2); // Ambil persentase perubahan harga
            if (percentChange >= 0) {
                priceChange.textContent = ` (+${percentChange}%)`; // Jika harga naik, tambahkan tanda tambah
                priceChange.classList.add('price-up');
            } else {
                priceChange.textContent = ` (${percentChange}%)`; // Jika harga turun, tidak perlu tanda tambah
                priceChange.classList.add('price-down');
            }

            cryptoLi.appendChild(cryptoIcon);
            cryptoLi.appendChild(cryptoName);
            cryptoLi.appendChild(priceChange);
            cryptoUl.appendChild(cryptoLi);
        });

        // Tambahkan event listener untuk pencarian
        const searchInput = document.getElementById('search');
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const cryptoItems = cryptoUl.getElementsByTagName('li');

            Array.from(cryptoItems).forEach(item => {
                const itemName = item.textContent.toLowerCase();
                if (itemName.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    })
    .catch(error => console.error('Error fetching data:', error));