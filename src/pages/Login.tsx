import '../assets/style.css'
import { Input } from '../components/Input'; 

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <form className="w-full max-w-sm space-y-4">
        <Input 
          label="Email" 
          type="email" 
          name="email" 
          placeholder="seu@email.com" 
        />
        
        <Input
          label="Senha"
          type="password"
          name="password"
          placeholder="********"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 py-2 font-bold text-white hover:bg-indigo-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}