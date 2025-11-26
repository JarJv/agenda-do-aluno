import { createContext, useContext, useState } from "react";
import api from "../api/axios";

type FrequenciaContextType = {
  faltas: number;
  setFaltas: (v: number) => void;
  atualizarFaltas: () => Promise<void>;
};

const FrequenciaContext = createContext<FrequenciaContextType | undefined>(undefined);

export function FrequenciaProvider({ children }: { children: React.ReactNode }) {
  const [faltas, setFaltas] = useState<number>(0);

  // 🔥 Recarrega as faltas a partir da API
  const atualizarFaltas = async () => {
    try {
      const response = await api.get("/calendario/", {
        params: { skip: 0, limit: 1000 }
      });

      if (response.data.success) {
        const total = response.data.data.filter(
          (e: any) => e.id_tipo_data === 1 // eventos de falta
        ).length;

        setFaltas(total);
      }
    } catch (error) {
      console.error("Erro ao atualizar faltas:", error);
    }
  };

  return (
    <FrequenciaContext.Provider value={{ faltas, setFaltas, atualizarFaltas }}>
      {children}
    </FrequenciaContext.Provider>
  );
}

export function useFrequencia() {
  const context = useContext(FrequenciaContext);
  if (!context) {
    throw new Error("useFrequencia deve ser usado dentro do FrequenciaProvider");
  }
  return context;
}