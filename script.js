function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  // login fixo só de exemplo
  if (user === "admin" && pass === "123") {
    localStorage.setItem("logado", "true"); // salva que está logado
    window.location.href = "registro.html"; // redireciona
  } else {
    alert("Usuário ou senha inválidos!");
  }
}

function logout() {
  localStorage.removeItem("logado"); // remove o login
  window.location.href = "index.html"; // volta para login
}

// bloqueia acesso se não estiver logado
function protegerPagina() {
  if (localStorage.getItem("logado") !== "true") {
    alert("Você precisa fazer login!");
    window.location.href = "index.html";
  }
} 
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chamadoForm");

  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      let chamado = {
        cliente: document.getElementById("cliente").value,
        endereco: document.getElementById("endereco").value,
        numeroCasa: document.getElementById("numeroCasa").value,
        numeroCll:  " + 55 (55) " + document.getElementById("numeroCll").value,
        problema: document.getElementById("problema").value,
        tecnico: document.getElementById("tecnico").value,
        descricao: document.getElementById("descricao").value
      };

      let chamados = JSON.parse(localStorage.getItem("chamados")) || [];
      chamados.push(chamado);
      localStorage.setItem("chamados", JSON.stringify(chamados));

      this.reset();
      alert("Chamado salvo com sucesso!");


      document.addEventListener("DOMContentLoaded", () => {
  const DDD = "(51) "; // aqui você fixa o DDD do RS

  const phone = document.getElementById("numeroCll");
  if (!phone) return;

  phone.setAttribute("inputmode", "numeric");
  phone.setAttribute("maxlength", "15");

  if (!phone.value.startsWith(DDD)) {
    phone.value = DDD;
  }

  phone.addEventListener("keydown", (e) => {
    const cursor = phone.selectionStart ?? 0;
    const tryingToDeletePrefix =
      (e.key === "Backspace" && cursor <= DDD.length) ||
      (e.key === "Delete" && cursor < DDD.length);
    if (tryingToDeletePrefix) {
      e.preventDefault();
      phone.setSelectionRange(DDD.length, DDD.length);
    }
  });

  phone.addEventListener("input", () => {
    if (!phone.value.startsWith(DDD)) {
      phone.value = DDD + phone.value.replace(/\D/g, "");
    }

    const rest = phone.value.slice(DDD.length).replace(/\D/g, "");
    let formatted = rest;
    if (rest.length > 5) {
      formatted = rest.slice(0, 5) + "-" + rest.slice(5, 9);
    }
    phone.value = DDD + formatted;
  });

  phone.addEventListener("focus", () => {
    setTimeout(() => {
      if (phone.selectionStart < DDD.length) {
        phone.setSelectionRange(phone.value.length, phone.value.length);
      }
    }, 0);
  });
});
    });
  }
});