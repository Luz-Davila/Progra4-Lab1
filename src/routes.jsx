//tanstack es una libreria de react para hacer consultas a apis, es como un cliente de apis, es como un fetch pero con muchas funcionalidades adicionales, como caching, revalidacion, etc.

import { 
createRootRoute,
createRoute,
createRouter,
Link,
Outlet,
} from '@tanstack/react-router'

import MeliHola from './components/MeliHola'
import QuizNeptuno from './components/QuizNeptuno'



// el root route es la ruta principal de la aplicacion, es la ruta que se renderiza cuando el usuario accede a la aplicacion, es la ruta que contiene
//  el layout de la aplicacion, es decir, el nav y el outlet donde se renderizan las demas rutas, esta es la ruta raiz, lo que se va a cargar de principio
const rootRoute = createRootRoute({
    component: function RootLayout() {
        return (
            <> 
                <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', }}>
                 
                    <Link to="/MeliHola" activeProps={{ style: { fontWeight: 'bold' } }}>
                        Saludo 
                    </Link>
                    <Link to="/QuizNeptuno" activeProps={{ style: { fontWeight: 'bold' } }}>
                        QuizNeptuno
                    </Link>
                </nav>

                <section id="center">
                     <Outlet />
                </section>
            </>
        )
    }
})

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,   
    path:'/MeliHola',
    component: MeliHola,
})

const quizRoute = createRoute({
    getParentRoute: () => rootRoute,
    path:'/QuizNeptuno',
    component: QuizNeptuno,
})

//estas dos ultimas lineas de codigo son para crear el router, el routeTree es el arbol de rutas, es decir, la estructura de las rutas
//  de la aplicacion, en este caso tenemos el rootRoute que es la ruta raiz y las rutas hijas que son indexRoute y quizRoute, luego se crea el router con el routeTree, este router es el que se va a usar en el index.jsx para renderizar la aplicacion
const routeTree = rootRoute.addChildren([indexRoute, quizRoute])
export const router = createRouter({ routeTree });