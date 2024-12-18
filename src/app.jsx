import { useEffect, useState } from 'react'

import {
  createRoutesFromElements,
  RouterProvider,
  Link,
  Route,
  createBrowserRouter,
  NavLink,
  useLocation,
  Outlet,
  useParams,
} from 'react-router-dom'

const Logo = ({ version = 'dark' }) => (
  <Link to="/">
    <img
      className="logo"
      src={`/logo-viajou-anotou-${version}.png`}
      alt="Logo ViajouAnotou"
    />
  </Link>
)

const Header = () => {
  let location = useLocation()
  const isHomePage = location.pathname === '/'
  return (
    <header>
      <nav className="nav">
        <Logo version={isHomePage ? 'light' : 'dark'} />
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
          <li>
            {location.pathname !== '/login' && (
              <NavLink className="cta" to="/login">
                LOGIN
              </NavLink>
            )}
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
        <Link to="app" className="cta">
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

const Login = () => (
  <>
    <Header />
    <main className="main-login">
      <section>
        <form className="form-login">
          <div className="row">
            <label>
              Email
              <input type="text" placeholder="email@email.com.br" />
            </label>
          </div>
          <div className="row">
            <label>
              Senha
              <input type="password" placeholder="**********" />
            </label>
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  </>
)

const AppLayout = () => (
  <>
    <main className="main-app-layout">
      <aside className="sidebar">
        <header>
          <Logo />
        </header>
        <nav className="nav-app-layout">
          <ul>
            <li>
              <NavLink to="cidades">Cidades</NavLink>
            </li>
            <li>
              <NavLink to="paises">Países</NavLink>
            </li>
          </ul>
        </nav>
        <Outlet />
      </aside>
      <section className="map">
        <h2>Map</h2>
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

const Cities = ({ cities }) =>
  cities.length === 0 ? (
    <p>Adicione uma cidade</p>
  ) : (
    <ul className="cities">
      {cities.map((city) => (
        <li key={city.id}>
          <Link to={`${city.id}`}>
            <h3>{city.name}</h3>
            <button>&times;</button>
          </Link>
        </li>
      ))}
    </ul>
  )
const TripDetails = ({ cities }) => {
  const params = useParams()
  const city = cities.find((city) => +params.id === city.id)

  return (
    <div className="city-details">
      <div className="row">
        <h5>Nome da cidade</h5>
        <h3>{city.name}</h3>
      </div>
      <div className="row">
        <h5>Suas anotações</h5>
        <p>{city.notes}</p>
      </div>
    </div>
  )
}
const Countries = ({ cities }) => {
  const groupedByCountry = Object.groupBy(cities, ({ country }) => country)
  const countries = Object.keys(groupedByCountry)
  return (
    <ul className="countries">
      {countries.map((c) => (
        <li key={c}>{c}</li>
      ))}
    </ul>
  )
}

const App = () => {
  const [cities, setCities] = useState([])

  useEffect(() => {
    fetch('/fake-cities.json')
      .then((response) => response.json())
      .then(setCities)
      .catch((error) => console.log(error))
  }, [])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/" element={<Home />} />
        <Route path="preco" element={<Pricing />} />
        <Route path="sobre" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Cities cities={cities} />} />
          <Route path="cidades" element={<Cities cities={cities} />} />
          <Route path="cidades/:id" element={<TripDetails cities={cities} />} />
          <Route path="paises" element={<Countries cities={cities} />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>,
    ),
  )
  return <RouterProvider router={router} />
}

export { App }
