import {
    createRootRoute,
    createRoute,
    createRouter,
    Link,
    Outlet,
} from "@tanstack/react-router";

import SaludoLuz from "./Components/SaludoLuz";
import Quiz from "./Components/Quiz";
import "./App.css";

const rootRoute = createRootRoute({
    component: function RootLayout() {
        return (
            <>
                <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
                    <Link to="/" activeProps={{ style: { fontWeight: "bold" } }}>
                        Inicio
                    </Link>
                    <Link to="/Quiz" activeProps={{ style: { fontWeight: "bold" } }}>
                        Quiz
                    </Link>
                </nav>
        <section id="center">
                <Outlet />
                </section>
            </>
        );
    },
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: SaludoLuz,
});

const quizRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/Quiz",
    component: Quiz,
});

const routeTree = rootRoute.addChildren([indexRoute, quizRoute]);

export const router = createRouter({
    routeTree,
});