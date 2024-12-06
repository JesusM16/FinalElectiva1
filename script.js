document.getElementById('dataForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('dataInput').value;
    if (!input) return alert('Please enter some data!');
    
    const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: input }),
    });

    if (response.ok) {
        fetchData();
    } else {
        alert('Error submitting data!');
    }
});

async function fetchData() {
    const response = await fetch('/api/data');
    const data = await response.json();
    const list = document.getElementById('dataList');
    list.innerHTML = data.map(item => `<p>${item}</p>`).join('');
}

fetchData();
