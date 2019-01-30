export interface App {
  props: AppProps
}

export interface AppProps {
  page: AppPage
}

export interface AppPage {
  path: URL
  title: string
}
