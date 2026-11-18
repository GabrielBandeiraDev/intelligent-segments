import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, History, ListFilter, Search, Sparkles, Store, UserRound, UserRoundPlus, UserRoundX, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { metrics, products, suppliers } from "@/components/segments-data";
import intelligenceAsset from "@/assets/zeuss-intelligence.jpg.asset.json";
import profileAsset from "@/assets/profile.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Segmentos inteligentes | ZEUSS 2.0" },
    { name: "description", content: "Segmentos inteligentes ZEUSS: clientes, categorias de compra, produtos e fornecedores da Nova Era em Manaus." },
    { property: "og:title", content: "Segmentos inteligentes | ZEUSS 2.0" },
    { property: "og:description", content: "Indicadores de clientes e insights de marketing da Nova Era em Manaus." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Brand() {
  return <div><div className="brand"><svg className="brand-mark" viewBox="0 0 32 38" fill="none" aria-hidden="true"><path d="M28 3 4 33M8 5h17c5 0 3 7-1 9L9 23c-5 3-6 10-1 10h17M6 12c-5-1-4-7 1-7M25 27c5 1 4 6-1 6M4 36 29 1" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg><span className="brand-word">ZEUSS</span><small>2.0</small></div><p className="brand-tagline">Transformando dados em decisões</p></div>;
}

function Index() {
  const [search, setSearch] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [sortAscending, setSortAscending] = useState(false);
  const [period, setPeriod] = useState(0);
  const query = search.trim().toLocaleLowerCase("pt-BR");
  const visibleProducts = products.filter(product => product.name.toLocaleLowerCase("pt-BR").includes(query));
  if (sortAscending) visibleProducts.reverse();
  const visibleSuppliers = suppliers.filter(supplier => supplier.name.toLocaleLowerCase("pt-BR").includes(query));
  const periodStart = new Date(Date.UTC(2026, 0, 1 + period * 10));
  const periodEnd = new Date(Date.UTC(2026, 0, 10 + period * 10));
  const month = periodEnd.toLocaleDateString("pt-BR", { month: "long", timeZone: "UTC" }).toUpperCase();
  const periodLabel = `${String(periodStart.getUTCDate()).padStart(2, "0")} à ${String(periodEnd.getUTCDate()).padStart(2, "0")} ${month} | ${periodEnd.getUTCFullYear()}`;
  return <div className="dashboard-shell">
    <aside className="dashboard-sidebar"><Brand /><nav className="sidebar-navigation" aria-label="Menu principal"><Button variant="navigation" aria-current="page"><UsersRound />Segmentos inteligentes</Button></nav></aside>
    <div className="dashboard-main">
      <header className="dashboard-header"><div className="breadcrumb"><span>ZEUSS 2.0</span><ChevronRight /><b>Marketing com IA</b></div><label className="search-field"><Search /><input aria-label="Buscar campanhas, clientes, produtos" placeholder="Buscar campanhas, clientes, produtos..." value={search} onChange={event => setSearch(event.target.value)} /></label><div className="profile"><img src={profileAsset.url} alt="Eduardo Paulino" /><div><b>Eduardo Paulino</b><small>Marketing · Nova Era</small></div></div></header>
      <main className="dashboard-content">
        <div className="overview-grid">
          <section className="insights-banner" aria-label="Segmentos inteligentes"><div className="insights-copy"><div className="insights-eyebrow"><Sparkles /> SEGMENTOS INTELIGENTES</div><h2>COMPARAÇÃO COM O PERÍODO ANTERIOR</h2><ul><li>Nos últimos 10 dias, tivemos um crescimento de 12,5%, passando de 8.000 para 9.000 clientes.</li><li>Em relação ao mês anterior, registramos um aumento de 18% na base total.</li><li>Os clientes ativos cresceram 9,3% no período.</li></ul><h2>INSIGHTS</h2><ul><li>O produto mais comprado por esses clientes foi o sabao em po com um total de 1020</li><li><b>290 clientes e de linguiça com 145 clientes</b></li><li>Tivemos uma queda do fornecedor perdigao de 15% nessa categoria</li></ul></div><img className="intelligence-art" src={intelligenceAsset.url} alt="ZEUSS I.A" /></section>
          <section className="clients-overview" aria-label="Resumo de clientes"><div className="location-picker"><Button variant="dashboard" className="location-button" aria-expanded={locationOpen} onClick={() => setLocationOpen(!locationOpen)}>Manaus | Nova Era<ChevronDown /></Button>{locationOpen && <div className="location-menu"><Button variant="dashboard" onClick={() => setLocationOpen(false)}>Manaus | Nova Era</Button></div>}</div><div className="total-clients"><p>NÚMERO DE CLIENTES (TOTAL)</p><strong>1.200.000</strong><UserRound /></div><div className="client-counts"><div className="client-count active"><p>CLIENTES ATIVOS</p><strong>900.500</strong></div><div className="client-count inactive"><p>CLIENTES INATIVOS</p><strong>100.500</strong></div></div></section>
        </div>
        <section className="metrics-grid" aria-label="Segmentos de clientes">{metrics.map(metric => <article key={metric.title} className={`metric-card ${metric.tone}`}><h2 className="metric-title">{metric.title} {metric.subtitle && <span>{metric.subtitle}</span>}</h2><div className="metric-number"><strong>{metric.value}</strong><span>Clientes</span></div><div className="metric-icon">{metric.icon === "new" ? <UserRoundPlus /> : metric.icon === "lost" ? <UserRoundX /> : <History />}</div><div className="metric-footer"><b>{metric.badge}</b><span>{metric.detail}</span></div></article>)}</section>
        <div className="analytics-grid">
          <section className="analytics-panel"><div className="panel-heading"><h2>Categorias de compra (Clientes novos)</h2><span className="total-badge">TOTAL: 1.450 Clientes</span></div><p className="panel-subtitle">Distribuição do mix de produtos da primeira compra dos 1.450 clientes</p><div className="category-chart"><div className="donut-chart" role="img" aria-label="Mercearia 35%, Carnes 30%, Limpeza 25%, Outros 10%"><div className="donut-center"><strong>1.450</strong><span>Novos</span></div></div><div className="chart-legend">{[{ name: "Mercearia", percent: 35, tone: "green" }, { name: "Carnes", percent: 30, tone: "cyan" }, { name: "Limpeza", percent: 25, tone: "violet" }, { name: "Outros", percent: 10, tone: "other" }].map(category => <div className="legend-row" key={category.name}><span className={`legend-dot ${category.tone}`} /><span>{category.name}</span><b>{category.percent}%</b></div>)}</div></div></section>
          <section className="analytics-panel products-panel"><div className="panel-heading"><h2>Top 10 Produtos mais vendidos</h2><Button variant="dashboard" className="filter-button" title={sortAscending ? "Ordenar do maior para o menor" : "Ordenar do menor para o maior"} aria-label="Alterar ordem dos produtos" aria-pressed={sortAscending} onClick={() => setSortAscending(!sortAscending)}><ListFilter /></Button></div><p className="panel-subtitle">Penetração de clientes por item (Rascunho: Sabão em pó Omo 20%, Linguiça Seara 10%)</p><div className="product-list">{visibleProducts.map(product => <div key={product.name}><div className="product-label"><strong>{products.indexOf(product) + 1}. {product.name}</strong><span><b>{product.percent}%</b> ({product.clients} clientes)</span></div><div className="product-track"><div className={`product-bar ${product.tone} p${product.percent}`} /></div></div>)}{visibleProducts.length === 0 && <p className="empty-search">Nenhum produto encontrado.</p>}</div></section>
          <section className="analytics-panel"><div className="panel-heading"><h2>Top 10 Fornecedores</h2></div><p className="panel-subtitle">Performance de participação das marcas parceiras</p><table className="supplier-table"><thead><tr><th>Fornecedor</th><th>% Compras</th><th>Qtd. Compras</th><th>Clientes Impactados</th><th>% Clientes</th></tr></thead><tbody>{visibleSuppliers.map(supplier => <tr key={supplier.name}><td><span className="supplier-name"><Store />{supplier.name}</span></td><td><span className="supplier-percent">{supplier.percent}%</span></td><td>{supplier.purchases}</td><td>{supplier.clients}</td><td className="supplier-share">{supplier.share}%</td></tr>)}</tbody></table>{visibleSuppliers.length === 0 && <p className="empty-search">Nenhum fornecedor encontrado.</p>}</section>
        </div>
        <div className="period-control"><Button variant="period" title="Período anterior" aria-label="Período anterior" onClick={() => setPeriod(period - 1)}><ChevronLeft /></Button><span>{periodLabel}</span><Button variant="period" title="Próximo período" aria-label="Próximo período" onClick={() => setPeriod(period + 1)}><ChevronRight /></Button></div>
      </main>
    </div>
  </div>;
}
