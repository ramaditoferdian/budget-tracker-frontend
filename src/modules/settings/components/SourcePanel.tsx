
// import SourceForm from './SourceForm' // bisa diaktifkan kalau kamu mau ada form tambah/edit langsung di panel

import SourceForm from "./SourceForm";
import SourceList from "./SourceList";


export default function SourcePanel() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">🏦 Manage Sources</h2>
      <p className="text-muted-foreground">
        Tambahkan dan kelola sumber dana Anda.
      </p>
      <SourceForm />
      <SourceList />
    </div>
  )
}
