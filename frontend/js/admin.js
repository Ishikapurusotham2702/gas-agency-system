function postNotice() {
    const text = document.getElementById('noticeText').value;
    if (text.trim()) {
      alert("Notice posted: " + text);
      document.getElementById('noticeText').value = "";
    }
  }
  
  window.onload = () => {
    const container = document.getElementById("requests");
    if (container) {
      container.innerHTML = `
        <div>
          <p>User123 requested extra cylinder.</p>
          <button onclick="approve()">Approve</button>
          <button onclick="reject()">Reject</button>
        </div>
      `;
    }
  };
  
  function approve() {
    alert("Request approved");
  }
  
  function reject() {
    alert("Request rejected");
  }