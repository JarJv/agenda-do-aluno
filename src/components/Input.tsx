import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import '../assets/style.css'


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string; // Para estilos extras
}

// forwardRef para que possamos passar uma 'ref' para o input,
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, name, type = 'text', className = '', ...props }, ref) => {
    
    // Garante que o label esteja conectado ao input (acessibilidade)
    const inputId = id || name;

    // Estilos base que se aplicam a todos os inputs
    const baseStyles =
      'w-full rounded-lg border-2 px-4 py-2 text-white placeholder-gray-400 transition-colors duration-200';

    // Estilos para o estado padrão 
    const defaultStyles = 'bg-gray-800 border-transparent';

    // Estilos para o estado de foco (baseado na sua 2ª imagem)
    const focusStyles =
      'focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50';

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1 block text-sm font-medium text-gray-200"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          name={name}
          ref={ref}
          className={`${baseStyles} ${defaultStyles} ${focusStyles} ${className}`}
          {...props} // Passa todos os outros props (placeholder, onChange, value, etc.)
        />
      </div>
    );
  }
);

// Define um nome de exibição para facilitar o debug no React DevTools
Input.displayName = 'Input';