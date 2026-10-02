const products = [
  {name:"Capacho de Vinil Personalizado", icon:"✦", cats:["personalizado","entrada"], desc:"Ideal para marcas, logotipos, letras e desenhos em entradas comerciais e residenciais.", tags:["Personalização","Vinil","Entradas"]},
  {name:"Clean Kap", icon:"✹", cats:["personalizado","entrada"], desc:"Linha para personalização visual com impressão de imagens e identidade da empresa.", tags:["Jet Print","Personalizado","Visual"]},
  {name:"Fibra de Coco", icon:"◈", cats:["entrada"], desc:"Solução para entradas e locais de alto tráfego, com aparência natural e base emborrachada.", tags:["Alto tráfego","Entrada","Natural"]},
  {name:"Water Kap", icon:"≈", cats:["entrada","umido"], desc:"Tapete para retenção de umidade, com superfície de polipropileno e base de borracha.", tags:["Umidade","Entrada","Absorção"]},
  {name:"Duo / Cross-Mat", icon:"▦", cats:["entrada"], desc:"Solução para áreas de entrada que precisam combinar retenção de sujeira e acabamento.", tags:["Entrada","Modular"]},
  {name:"Acqua Kap", icon:"⌁", cats:["umido"], desc:"Piso modular indicado para piscinas, vestiários, saunas e outros ambientes úmidos.", tags:["Piscina","Modular","Úmido"]},
  {name:"S-Kap Antiderrapante", icon:"◆", cats:["umido"], desc:"Piso antiderrapante e antifungo para áreas molhadas e ambientes de uso intenso.", tags:["Antiderrapante","Antifungo"]},
  {name:"Laminados", icon:"▤", cats:["protecao"], desc:"Material em rolo para aplicações de proteção e acabamento em diferentes ambientes.", tags:["PVC","Rolo","Proteção"]},
  {name:"Linha Náutica", icon:"⚓", cats:["especial"], desc:"Soluções sob medida para embarcações, com foco em resistência e segurança.", tags:["Náutica","Sob medida"]},
  {name:"Prote-Pisos", icon:"⌂", cats:["protecao"], desc:"Proteção para pisos sob cadeiras e outros pontos que precisam reduzir desgaste.", tags:["PVC","Proteção"]},
  {name:"Tapete Sanitizante", icon:"✓", cats:["entrada","protecao"], desc:"Produto destinado a higienização de solados, com conteúdo da página atual a ser revisado.", tags:["Higiene","Entrada"]},
  {name:"Grama Sintética", icon:"▥", cats:["especial"], desc:"Solução decorativa para jardins, áreas de lazer e projetos externos.", tags:["Decorativo","Lazer"]}
];

const grid = document.getElementById("productGrid");
const search = document.getElementById("search");
const filters = [...document.querySelectorAll(".filter")];

function renderProducts(){
  const active = document.querySelector(".filter.active").dataset.filter;
  const term = search.value.toLowerCase().trim();
  const list = products.filter(p => (active==="all" || p.cats.includes(active)) && (!term || (p.name+" "+p.desc+" "+p.tags.join(" ")).toLowerCase().includes(term)));
  grid.innerHTML = list.length ? list.map(p => `
    <article class="product">
      <div class="product-icon">${p.icon}</div>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
    </article>`).join("") : `<p>Nenhum produto encontrado.</p>`;
}
filters.forEach(btn => btn.addEventListener("click",()=>{filters.forEach(b=>b.classList.remove("active"));btn.classList.add("active");renderProducts()}));
search.addEventListener("input",renderProducts);
renderProducts();

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
toggle.addEventListener("click",()=>nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const quiz = [
  {q:"Onde o produto será usado?", opts:[["Empresa ou comércio","empresa"],["Casa ou condomínio","casa"],["Piscina ou área molhada","umido"],["Barco ou embarcação","nautica"]]},
  {q:"Você precisa de personalização?", opts:[["Sim, quero meu logo","personalizado"],["Não, quero uma solução funcional","funcional"]]},
  {q:"O que é mais importante?", opts:[["Impacto visual","visual"],["Retenção de sujeira/umidade","entrada"],["Antiderrapância","seguranca"],["Resistência e uso especial","especial"]]}
];
let qIndex=0, answers=[];
function renderQuiz(){
  if(qIndex>=quiz.length){
    const a=answers.join(" ");
    let result = a.includes("nautica") ? "Linha Náutica" :
      a.includes("umido") ? "Acqua Kap ou S-Kap" :
      a.includes("personalizado") || a.includes("visual") ? "Capacho de Vinil Personalizado ou Clean Kap" :
      a.includes("seguranca") ? "S-Kap Antiderrapante" :
      a.includes("entrada") ? "Water Kap, Fibra de Coco ou Duo" : "Capacho de Vinil ou Fibra de Coco";
    document.getElementById("quizStep").textContent="Sua sugestão inicial";
    document.getElementById("quizOptions").innerHTML="";
    const box=document.getElementById("quizResult");
    box.hidden=false;
    box.innerHTML=`<strong>${result}</strong><span>Essa é uma indicação inicial. Para escolher com segurança, envie medidas e aplicação no orçamento.</span><br><br><a class="btn primary" href="#orcamento">Pedir orçamento</a>`;
    return;
  }
  const current=quiz[qIndex];
  document.getElementById("quizStep").textContent=current.q;
  document.getElementById("quizOptions").innerHTML=current.opts.map(([label,val])=>`<button data-value="${val}">${label}</button>`).join("");
  document.querySelectorAll("#quizOptions button").forEach(b=>b.addEventListener("click",()=>{answers.push(b.dataset.value);qIndex++;renderQuiz()}));
}
renderQuiz();

const whatsappNumber = "5551999999999"; // SUBSTITUA pelo número comercial real, com DDI + DDD.
const whatsappLink = document.getElementById("whatsappLink");
whatsappLink.href = `https://wa.me/${whatsappNumber}`;

document.getElementById("quoteForm").addEventListener("submit", e=>{
  e.preventDefault();
  const data = new FormData(e.target);
  const msg = [
    "Olá! Gostaria de solicitar um orçamento.",
    `Nome: ${data.get("nome")}`,
    `WhatsApp: ${data.get("whatsapp")}`,
    `E-mail: ${data.get("email") || "Não informado"}`,
    `Produto: ${data.get("produto")}`,
    `Medidas: ${data.get("medidas") || "Não informado"}`,
    `Quantidade: ${data.get("quantidade") || "Não informado"}`,
    `Mensagem: ${data.get("mensagem") || "Não informado"}`
  ].join("\n");
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
});
