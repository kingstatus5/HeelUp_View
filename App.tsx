import { HeelUpViewer } from './components/HeelUpViewer'
import { ProductControls } from './components/ProductControls'
import { useViewerStore } from './store/viewerStore'

export default function App() {
  const theme = useViewerStore((s) => s.theme)
  const dark = theme === 'dark'

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${dark ? 'bg-[#0e1012]' : 'bg-[#e8ecee]'}`}
    >
      <HeelUpViewer />
      <ProductControls />
    </div>
  )
}
