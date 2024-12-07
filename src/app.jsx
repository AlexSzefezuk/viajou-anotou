import {
  createRoutesFromElements,
  RouterProvider,
  Link,
  Route,
  createBrowserRouter,
  NavLink,
  useLocation,
} from 'react-router-dom'

const Header = () => {
  let location = useLocation()
  return (
    <header>
      <nav className="nav">
        <Link to="/">
          <img
            className="logo"
            src={
              location.pathname === '/'
                ? '/logo-viajou-anotou-light.png'
                : '/logo-viajou-anotou-dark.png'
            }
            alt="Logo Viajou Anotou em modo claro"
          />
        </Link>
        <ul>
          <li>
            <NavLink className={location.pathname !== '/' && 'dark'} to="/">
              INÍCIO
            </NavLink>
          </li>
          <li>
            <NavLink
              className={location.pathname !== '/' && 'dark'}
              to="/preco"
            >
              PREÇO
            </NavLink>
          </li>
          <li>
            <NavLink
              className={location.pathname !== '/' && 'dark'}
              to="/sobre"
            >
              SOBRE
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

const Home = () => (
  <>
    <Header />
    <main className="main-home">
      <section>
        <h1>
          Você viaja o mundo <br /> E o ViajouAnotou mantém suas aventuras
          anotadas
        </h1>
        <h2>
          Um mapa mundial que rastreia por onde você passou. Nunca esqueça suas
          experiências e mostre aos seus amigos o quê você fez pelo mundo.
        </h2>
        <Link to="sobre" className="cta">
          COMEÇAR AGORA
        </Link>
      </section>
    </main>
  </>
)

const Pricing = () => (
  <>
    <Header />
    <main className="main-pricing">
      <section>
        <div>
          <h1>Preço simples. Só R$ 47/mês.</h1>
          <p>
            Comece hoje mesmo a anotar suas aventuras e mostre aos seus amigos o
            quê você fez pelo mundo.
          </p>
        </div>
        <img src="/preco-viajou-anotou.jpg" alt="Paulista em são paulo" />
      </section>
    </main>
  </>
)
const About = () => (
  <>
    <Header />
    <main className="main-about">
      <section>
        <div>
          <h1>Sobre o ViajouAnotou.</h1>
          <p>
            O ViajouAnotou nasceu do desejo dos amigos Paulo e Roberto de
            compartilharem de forma rápida suas aventuras pelo mundo.
          </p>
          <p>
            Aos poucos, esse desejo virou realidade em forma de software entre
            amigos e familiares. Hoje, você também pode ser parte dessa
            comunidade.
          </p>
        </div>
        <img src="/sobre-viajou-anotou.jpg" alt="Amigos ao por do sol" />
      </section>
    </main>
  </>
)

const NotFound = () => (
  <>
    <main className="main-not-found">
      <section>
        <h1>Página não encontrada</h1>
        <Link to="/" className="cta">
          Voltar ao início
        </Link>
      </section>
    </main>
  </>
)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<Home />} />
      <Route path="preco" element={<Pricing />} />
      <Route path="sobre" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
)

const App = () => (
  <>
    <RouterProvider router={router} />
  </>
)

export { App }
