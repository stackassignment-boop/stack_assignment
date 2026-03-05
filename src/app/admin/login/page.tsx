import { redirect } from 'next/navigation'

export default function AdminLoginRoute() {
  redirect('/?view=admin')
}
