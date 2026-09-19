document
    .getElementById('houseForm')
    .addEventListener('submit', async function(event) {
    event.preventDefault();

    const area = document.getElementById('area').value;
    const bedrooms = document.getElementById('bedrooms').value;
    const location = document.getElementById('location').value;
    const resultDiv = document.getElementById('result');

    resultDiv.style.display = 'none';

    const url = `/predict?area=${encodeURIComponent(area)}&bedrooms=${encodeURIComponent(bedrooms)}&location=${encodeURIComponent(location)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Yêu cầu không thành công (Mã lỗi: ${response.status})`);
        }
        const data = await response.json();
        const formattedPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(data.predicted_price);
        resultDiv.className = 'success';
        resultDiv.innerHTML = `
            <h3>Kết quả ước tính:</h3>
            <p><strong>Giá nhà dự đoán:</strong> <span style="font-size: 1.2em; color: #11772d;">${formattedPrice}</span></p>
            <small>(Thông số: ${data.area} m², ${data.bedrooms} phòng ngủ, vị trí: ${data.location.toUpperCase()})</small>
        `;
        resultDiv.style.display = 'block';
    } catch (error) {
        console.error('Lỗi khi gọi API dự đoán:', error);
        resultDiv.className = 'error';
        resultDiv.textContent = `Đã xảy ra lỗi: ${error.message}`;
        resultDiv.style.display = 'block';
    }
});
