function bookCylinder() {
    alert("Cylinder booking request submitted!");
  }
  
  function pay(method) {
    alert(`Payment method selected: ${method}`);
  }
  
  function goBack() {
    window.location.href = 'dashboard.html';
  }
  
  window.onload = () => {
    const notices = document.getElementById("notices");
    if (notices) notices.innerHTML = "<p>No notices available.</p>";
  
    const table = document.getElementById("historyTable");
    if (table) {
      const data = [
        { date: "2025-04-10", status: "Delivered", payment: "Paytm" },
        { date: "2025-03-15", status: "Delivered", payment: "Cash" }
      ];
      data.forEach(entry => {
        const row = table.insertRow();
        row.innerHTML = `<td>${entry.date}</td><td>${entry.status}</td><td>${entry.payment}</td>`;
      });
    }
  };