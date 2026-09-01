# 📋 Plan de Desarrollo — AgentHub

> Basado en SPECS.md — Especificaciones exactas del proyecto

---

## 1. 📌 Resumen del Proyecto

**AgentHub** es una plataforma para alquilar agentes de IA y recibir asesorías. Los agentes implementan skills de IA para tareas como navegación, búsqueda y gestión de documentos.

---

## 2. 🎨 Sistema de Diseño (Design System)

| Token | Valor |
|-------|-------|
| **Primary** | `#4F46E5` |
| **Secondary** | `#06B6D4` |
| **Tertiary** | `#10B981` |
| **Neutral** | `#0F172A` |

### Tipografía
- **Montserrat**, **Inter**, **Geist**

### Estilo General
- Dark mode 🌙
- Minimalista y moderno
- Bordes redondeados
- Espaciado basado en grilla de **8px**
- Consistencia visual y accesibilidad

### Componentes del Design System
- Botones
- Buscador (Search Bar)
- Barras de progreso
- Navegación inferior (Bottom Navigation)
- Chips / Pills
- Iconografía outline

---

## 3. 🛠 Stack Tecnológico

| Tecnología | Propósito |
|-----------|-----------|
| **TypeScript** | Tipado estático |
| **Tailwind CSS** | Estilos (única librería permitida) |
| **Vite** | Bundler |
| **HTML Semántico** | Estructura accesible |
| **Favicon** | Identidad visual |

---

## 4. ⚠️ Restricciones del Proyecto

- ✅ **Mobile First** — Todo el diseño comienza desde mobile
- ✅ **100% Responsive** — Adaptable a todos los breakpoints
- ✅ **Optimización SEO y GEO** — Meta tags, Open Graph, datos estructurados
- ✅ **Solo Tailwind CSS** — No se permite CSS puro ni otras librerías de estilos
- ✅ **UX Priority** — La experiencia de usuario es prioridad absoluta

---

## 5. 📄 Estructura de Contenido / Páginas

### 5.1 Navbar (Global)
```
┌──────────┬───────────────────────────┬──────────┐
│   LOGO   │ explore | agentes | chat  │  🛒      │
│          │ metrics                   │          │
└──────────┴───────────────────────────┴──────────┘
```
- Logo alineado a la **izquierda**
- Opciones de navegación alineadas a la **derecha**: `explore`, `agentes`, `chat`, `metrics`
- Carrito de compras al **extremo derecho**

### 5.2 Home / Landing Page

#### Sección de Introducción
- Breve resumen de la plataforma (Hero Section)
- Buscador de agentes al lado derecho del resumen

#### Grid de Agentes (4 Tarjetas)
```
┌─────────────────────────────────────────────┐
│  🎯  [Nombre Agente]            ● Activo    │
│  Breve descripción del agente               │
│                                             │
│  [#skill1]  [#skill2]  [#skill3]  [#skill4] │
│                                             │
│                            [⋮ Desplegable]  │
└─────────────────────────────────────────────┘
```

**Especificaciones de cada tarjeta:**
- Diseño moderno tipo **dashboard SaaS** en modo oscuro
- **Bordes redondeados**
- **Fondo en tonos azul oscuro**
- **Sombras sutiles**
- **Jerarquía visual clara**
- Incluye:
  - Ícono del agente
  - Nombre del agente
  - Breve descripción
  - **Tags (pills)** con al menos **4 skills** — colores de acento
  - **Indicador de estado** (ej. activo/inactivo)
- **Dropdown (⋮)** con opciones:
  - "Ver detalle"
  - "Eliminar"

#### Estado Inicial
- **Por defecto el usuario tiene 4 agentes ya contratados.**

### 5.3 Dashboard de Métricas

```
┌─────────────────────────────────────────────┐
│  Metrics Dashboard                           │
│                                             │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │📊    │  │💰    │  │🤖    │  │⚠️    │     │
│  │Ingre.│  │Pérdi.│  │Activ.│  │Fallos│     │
│  │$X,XXX│  │$X,XXX│  │  X   │  │  X   │     │
│  └──────┘  └──────┘  └──────┘  └──────┘     │
│                                             │
│  ┌──────────────────────────────────┐       │
│  │       📈 Actividad Semanal       │       │
│  │       (Área para gráfico)        │       │
│  │                                  │       │
│  └──────────────────────────────────┘       │
└─────────────────────────────────────────────┘
```

**4 tarjetas de métricas clave:**
1. **Ingresos mensuales**
2. **Pérdidas por descuentos**
3. **Agentes activos**
4. **Agentes con al menos 6 fallos** (hardcodeados)

**Área adicional:**
- Área reservada para **gráfico de actividad semanal**

---

## 6. 🧩 Componentes Reutilizables

| Componente | Descripción |
|-----------|-------------|
| **Sidebar** | Navegación lateral persistente |
| **Tarjeta de métrica** | Para mostrar indicadores clave (reutilizable en dashboard) |
| **Dropdown de acciones** | Menú activado mediante botón `⋮` |
| **Modal** | Overlay con backdrop + botón de cierre |
| **Badge** | Etiquetas de estado o gravedad con código de color |
| **Lista de skills colapsable** | Elemento expandible para ocultar/mostrar detalles |
| **Toggle dark/light** | Interruptor global de tema |

---

## 7. 🗺 Arquitectura de la Aplicación

### 7.1 Árbol de Componentes (Propuesto)

```
App
├── ThemeProvider (Context)
├── Navbar
│   ├── Logo
│   ├── NavLinks (explore, agentes, chat, metrics)
│   └── CartIcon
├── Routes
│   ├── / → HomePage
│   │   ├── HeroSection
│   │   │   ├── ResumeText
│   │   │   └── SearchBar
│   │   └── AgentGrid
│   │       └── AgentCard (×4)
│   │           ├── AgentIcon
│   │           ├── AgentInfo (name, description)
│   │           ├── SkillsList (collapsible)
│   │           │   └── SkillPill (×n)
│   │           ├── StatusIndicator
│   │           └── ActionsDropdown
│   │               ├── "Ver detalle"
│   │               └── "Eliminar"
│   │
│   ├── /metrics → MetricsDashboard
│   │   ├── MetricCard (×4)
│   │   │   ├── MetricIcon
│   │   │   ├── MetricValue
│   │   │   └── MetricLabel
│   │   └── ActivityChart (placeholder/skeleton)
│   │
│   ├── /agentes → AgentsListPage
│   ├── /explore → ExplorePage
│   └── /chat → ChatPage
│
├── Sidebar (persistent)
├── Modal (global, portal)
└── DarkModeToggle
```

### 7.2 Flujo de Navegación

```
[Home] → Hero + Search → Agent Grid
   ├── Agent Card ⋮ → "Ver detalle" → Modal/Detail
   │                 → "Eliminar"   → Confirmación
   └── Navbar
       ├── explore  → /explore
       ├── agentes  → /agentes
       ├── chat     → /chat
       └── metrics  → /metrics → Dashboard
```

---

## 8. 📱 Estrategia Mobile First

### Breakpoints (Tailwind Defaults)

| Breakpoint | Min Width | Target |
|-----------|-----------|--------|
| `sm` | 640px | Mobile large |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Desktop wide |

### Layout Adaptativo

- **Mobile (< md):** Stack vertical, navbar simplificada (hamburger menu), sidebar oculto
- **Tablet (md - lg):** Grid de 2 columnas, sidebar colapsable
- **Desktop (≥ lg):** Grid de 4 columnas, sidebar visible, navbar completa

---

## 9. 📈 Data Mock / Estado Inicial

```typescript
// 4 agentes por defecto (hardcodeados)
const DEFAULT_AGENTS = [
  {
    id: "agent-1",
    name: "Navigator AI",
    icon: "🧭",
    description: "Agente especializado en navegación web y extracción de datos",
    skills: ["Web Scraping", "Navigation", "Data Mining", "Reporting"],
    status: "active",
  },
  {
    id: "agent-2",
    name: "SearchPro",
    icon: "🔍",
    description: "Búsqueda avanzada con filtros inteligentes",
    skills: ["Deep Search", "Filtering", "Ranking", "Semantic Search"],
    status: "active",
  },
  {
    id: "agent-3",
    name: "DocMaster",
    icon: "📄",
    description: "Gestión y procesamiento de documentos",
    skills: ["OCR", "Parsing", "Summarization", "Translation"],
    status: "active",
  },
  {
    id: "agent-4",
    name: "DataAnalyst",
    icon: "📊",
    description: "Análisis de datos y generación de reportes",
    skills: ["Analytics", "Visualization", "Forecasting", "ETL"],
    status: "inactive",
  },
];

// Métricas hardcodeadas
const METRICS = {
  monthlyRevenue: "$12,450",
  discountLosses: "$1,230",
  activeAgents: 3,
  agentsWithFailures: 2, // al menos 6 fallos
};
```

---

## 10. ✅ Checklist de Implementación

### Fase 1 — Setup (Configuración Inicial)
- [x] Inicializar proyecto con TypeScript + Tailwind + Vite (sin frameworks)
- [x] Implementar router SPA vanilla con hash-based routing
- [x] Configurar tema oscuro por defecto
- [x] Agregar favicon

### Fase 2 — Layout Global
- [ ] Implementar Navbar (logo + nav links + cart)
- [ ] Implementar Sidebar persistente
- [ ] Implementar Dark Mode Toggle

### Fase 3 — Home Page
- [ ] Hero section con resumen y buscador
- [ ] Grid de 4 AgentCards
- [ ] AgentCard (icono, nombre, descripción, skills, estado)
- [ ] Actions Dropdown (ver detalle, eliminar)
- [ ] Modal para "ver detalle"
- [ ] Modal de confirmación para "eliminar"

### Fase 4 — Dashboard de Métricas
- [ ] 4 MetricCards (ingresos, pérdidas, activos, fallos)
- [ ] Área de gráfico de actividad semanal (placeholder)
- [ ] Skills list colapsable

### Fase 5 — Responsive & UX
- [ ] Mobile First completo
- [ ] Breakpoints: sm, md, lg, xl
- [ ] SEO: meta tags, Open Graph
- [ ] Pruebas de accesibilidad

---

## 11. 📂 Estructura de Archivos Propuesta

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── SearchBar.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── DarkModeToggle.tsx
│   │   └── ActionsDropdown.tsx
│   ├── agents/
│   │   ├── AgentCard.tsx
│   │   ├── AgentGrid.tsx
│   │   └── SkillsList.tsx
│   └── dashboard/
│       ├── MetricCard.tsx
│       └── ActivityChart.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── MetricsPage.tsx
│   ├── AgentsPage.tsx
│   ├── ExplorePage.tsx
│   └── ChatPage.tsx
├── contexts/
│   ├── ThemeContext.tsx
│   └── AgentsContext.tsx
├── data/
│   └── mockData.ts
├── styles/
│   └── globals.css
├── App.tsx
├── main.tsx
└── index.html
```

---

> **Documento generado a partir de SPECS.md — Versión 1.0**