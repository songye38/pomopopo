/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_ID: string
  readonly VITE_ENV: 'development' | 'production' | 'test'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
