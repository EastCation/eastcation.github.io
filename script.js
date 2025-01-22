const updateTimeEl = document.getElementById('updateTime');
const progressIds = ['cuteProgress', 'stressProgress', 'darknessProgress', 'healthProgress'];
const pieCanvas = document.getElementById('pieChart');
const pieCtx = pieCanvas.getContext('2d');

fetch('count.txt')
    .then(response => response.text())
    .then(data => {
        const values = data.split('\n').map(Number);
        updateProgressBars(values);
        drawPieChart(values);
        updateTimeEl.textContent = `时间：${new Date().toLocaleString()}`;
    })
    .catch(error => console.error('Error fetching count.txt:', error));

function updateProgressBars(values) {
    values.forEach((value, index) => {
        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        progressBar.style.width = `${value}%`;
        progressBar.textContent = `${value}%`;
        document.getElementById(progressIds[index]).appendChild(progressBar);
    });
}

function drawPieChart(values) {
    const labels = ['可爱程度', '压力', '黑暗值', '生命值'];
    const colors = ['pink', '#66CCFF', '#6a5acd', '#3cb371'];

    pieCtx.clearRect(0, 0, pieCanvas.width, pieCanvas.height);
    pieCanvas.width = 400;
    pieCanvas.height = 400;

    let startAngle = 0;
    const total = values.reduce((acc, val) => acc + val, 0);

    values.forEach((value, index) => {
        const angle = (value / total) * 2 * Math.PI;
        pieCtx.beginPath();
        pieCtx.moveTo(200, 200);
        pieCtx.arc(200, 200, 200, startAngle, startAngle + angle);
        pieCtx.closePath();
        pieCtx.fillStyle = colors[index];
        pieCtx.fill();

        // Draw label
        const x = 200 + 200 * Math.cos(startAngle + angle / 2);
        const y = 200 + 200 * Math.sin(startAngle + angle / 2);
        pieCtx.fillStyle = 'black';
        pieCtx.font = '12px Arial';
        pieCtx.fillText(`${labels[index]}: ${value}%`, x, y);

        startAngle += angle;
    });
}