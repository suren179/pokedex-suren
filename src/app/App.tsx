import React, { useMemo, lazy, Suspense } from 'react';
import { createUseStyles } from 'react-jss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LayoutProvider } from '../contexts';
import { Nav } from '../components/Nav';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ROUTES } from '../constants';
import { Loader } from '../components/Loader';

const Home = lazy(() =>
  import('../screens/Home').then((module) => ({
    default: module.Home,
  })),
);
const ListPage = lazy(() =>
  import('../screens/ListPage').then((module) => ({
    default: module.ListPage,
  })),
);

function App() {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: 'dark',
          background: {
            default: '#171E2b', // Background color moved here
          },
        },
      }),
    [],
  );
  const classes = useStyles();
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LayoutProvider>
          <div className={classes.root}>
            <BrowserRouter>
              <Nav />
              <div className={classes.content}>
                <div className={classes.scrollableArea}>
                  <Routes>
                    <Route
                      path={ROUTES.HOME}
                      element={
                        <Suspense fallback={<Loader />}>
                          <Home />
                        </Suspense>
                      }
                    />
                    <Route
                      path={ROUTES.POKEMON_LIST}
                      element={
                        <Suspense fallback={<Loader />}>
                          <ListPage />
                        </Suspense>
                      }
                    />
                    <Route
                      path={ROUTES.POKEMON_LIST + '/:id'}
                      element={
                        <Suspense fallback={<Loader />}>
                          <ListPage />
                        </Suspense>
                      }
                    />
                  </Routes>
                </div>
              </div>
            </BrowserRouter>
          </div>
        </LayoutProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

const useStyles = createUseStyles(
  {
    root: {
      background: '#171E2b',
      minHeight: '100vh',
      minWidth: '100vw',
      height: '100%',
      width: '100%',
      display: 'flex',
    },
    content: {
      flex: '1',
      overflow: 'hidden',
      position: 'relative',
    },
    scrollableArea: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'auto',
    },
  },
  { name: 'App' },
);

export default App;
