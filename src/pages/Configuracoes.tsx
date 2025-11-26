import "../assets/style.css";
import {
  Gear,
  DownloadSimple,
  LockOpen,
  ArrowCounterClockwise,
  X,
  Warning,
  CheckCircle,
  Info,
} from "@phosphor-icons/react";
import SettingButton from "../components/SettingButton.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// --- HELPERS ---

const getDiaSemana = (dia: number) => {
  const dias = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  return dias[dia] || dias[dia - 1] || "Dia a confirmar";
};

// Função para limpar texto (Remove aspas e quebras de linha extras)
const cleanText = (text: any) => {
  if (!text) return "-";
  const str = String(text);
  // Remove aspas duplas no começo e fim, e remove quebras de linha
  return str
    .replace(/^"|"$/g, "")
    .replace(/\\n|\n/g, " ")
    .trim();
};

// Função para extrair dados da API com segurança
const extractData = (result: any) => {
  if (result && result.data) {
    const dadosBrutos = result.data;
    if (dadosBrutos && dadosBrutos.data) {
      return Array.isArray(dadosBrutos.data)
        ? dadosBrutos.data
        : [dadosBrutos.data];
    }
    return Array.isArray(dadosBrutos) ? dadosBrutos : [dadosBrutos];
  }
  if (result.status === "fulfilled") {
    const dadosBrutos = result.value.data;
    if (dadosBrutos && dadosBrutos.data) {
      return Array.isArray(dadosBrutos.data)
        ? dadosBrutos.data
        : [dadosBrutos.data];
    }
    return Array.isArray(dadosBrutos) ? dadosBrutos : [dadosBrutos];
  }
  return [];
};

export default function Configuracoes() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- ESTADOS DOS MODAIS ---
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [alertModal, setAlertModal] = useState({
    show: false,
    title: "",
    message: "",
    type: "info", // info | error | success
    onClose: () => {},
  });

  const [newPassword, setNewPassword] = useState("");

  function doToast() {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  }

  const showAlert = (
    title: string,
    message: string,
    type: "info" | "error" | "success" = "info",
    onClose?: () => void
  ) => {
    setAlertModal({
      show: true,
      title,
      message,
      type,
      onClose:
        onClose || (() => setAlertModal((prev) => ({ ...prev, show: false }))),
    });
  };

  // --- 1. FUNÇÃO DE DOWNLOAD (PDF) ---
  async function handleDownloadPDF() {
    try {
      setLoading(true);

      const results = await Promise.allSettled([
        api.get("/usuario/me"),
        api.get("/horario/"),
        api.get("/notas/"),
        api.get("/calendario/"),
        api.get("/anotacao/"),
        api.get("/docentes/"),
      ]);

      let perfil = extractData(results[0])[0] || {};
      const listaHorarios = extractData(results[1]);
      const listaNotas = extractData(results[2]);
      const listaEventos = extractData(results[3]);
      const listaAnotacoes = extractData(results[4]);
      const listaDocentes = extractData(results[5]);

      const doc = new jsPDF();

      // Cabeçalho
      doc.setFillColor(30, 32, 56);
      doc.rect(0, 0, 210, 40, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text("Relatório Acadêmico", 14, 20);
      doc.setFontSize(10);
      doc.text(`Gerado em: ${new Date().toLocaleDateString()}`, 14, 30);

      // Dados do Aluno
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(14);
      doc.text("Dados do Estudante", 14, 50);
      doc.setFontSize(10);
      doc.setTextColor(50);

      // Aplica cleanText para garantir que o nome venha limpo também
      doc.text(`Nome: ${cleanText(perfil.nome)}`, 14, 60);
      doc.text(`RA: ${cleanText(perfil.ra)}`, 14, 66);
      doc.text(`Email: ${cleanText(perfil.email)}`, 14, 72);
      doc.text(`Instituição: ${cleanText(perfil.nome_instituicao)}`, 110, 60);
      doc.text(`Curso: ${cleanText(perfil.nome_curso)}`, 110, 66);
      doc.text(`Módulo: ${perfil.modulo ? perfil.modulo + "º" : "-"}`, 110, 72);

      let finalY = 85;

      // Tabelas (Agora com cleanText em cada célula)
      const safeList = (list: any) => (Array.isArray(list) ? list : []);

      // 1. Grade Horária
      doc.setFontSize(13);
      doc.setTextColor(30, 32, 56);
      doc.text("Grade Horária", 14, finalY);
      if (safeList(listaHorarios).length > 0) {
        autoTable(doc, {
          startY: finalY + 4,
          head: [["Dia", "Aula", "Disciplina"]],
          body: safeList(listaHorarios).map((h: any) => [
            cleanText(getDiaSemana(h.dia_semana || 0)),
            cleanText(h.numero_aula ? `${h.numero_aula}ª Aula` : "-"),
            cleanText(h.disciplina),
          ]),
          theme: "grid",
          headStyles: { fillColor: [67, 70, 105] },
        });
        finalY = (doc as any).lastAutoTable.finalY + 12;
      } else {
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("(Nenhum horário encontrado)", 14, finalY + 8);
        finalY += 20;
      }

      // 2. Boletim de Notas
      doc.setFontSize(13);
      doc.setTextColor(30, 32, 56);
      doc.text("Boletim de Notas", 14, finalY);
      if (safeList(listaNotas).length > 0) {
        autoTable(doc, {
          startY: finalY + 4,
          head: [["Disciplina", "Bimestre", "Nota"]],
          body: safeList(listaNotas).map((n: any) => [
            cleanText(n.disciplina || "Geral"),
            cleanText(n.bimestre ? `${n.bimestre}º` : "-"),
            cleanText(n.nota),
          ]),
          theme: "striped",
          headStyles: { fillColor: [46, 139, 87] },
        });
        finalY = (doc as any).lastAutoTable.finalY + 12;
      } else {
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("(Nenhuma nota encontrada)", 14, finalY + 8);
        finalY += 20;
      }

      // 3. Calendário Escolar
      doc.setFontSize(13);
      doc.setTextColor(30, 32, 56);
      doc.text("Calendário Escolar", 14, finalY);
      if (safeList(listaEventos).length > 0) {
        autoTable(doc, {
          startY: finalY + 4,
          head: [["Data", "Evento"]],
          body: safeList(listaEventos).map((evt: any) => [
            evt.data_evento
              ? new Date(evt.data_evento).toLocaleDateString()
              : "-",
            cleanText(evt.nome || evt.titulo || "Evento"),
          ]),
          theme: "grid",
          headStyles: { fillColor: [220, 20, 60] },
        });
        finalY = (doc as any).lastAutoTable.finalY + 12;
      } else {
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("(Nenhum evento encontrado)", 14, finalY + 8);
        finalY += 20;
      }

      // 4. Corpo Docente
      doc.setFontSize(13);
      doc.setTextColor(30, 32, 56);
      doc.text("Corpo Docente", 14, finalY);
      if (safeList(listaDocentes).length > 0) {
        autoTable(doc, {
          startY: finalY + 4,
          head: [["Nome", "Disciplina", "Email"]],
          body: safeList(listaDocentes).map((d: any) => [
            cleanText(d.nome),
            cleanText(d.disciplina),
            cleanText(d.email),
          ]),
          theme: "plain",
          headStyles: { fillColor: [100, 100, 100] },
        });
        finalY = (doc as any).lastAutoTable.finalY + 12;
      } else {
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("(Nenhum professor encontrado)", 14, finalY + 8);
        finalY += 20;
      }

      // 5. Anotações
      if (safeList(listaAnotacoes).length > 0) {
        doc.addPage();
        doc.setFillColor(30, 32, 56);
        doc.rect(0, 0, 210, 20, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.text("Minhas Anotações", 14, 13);

        autoTable(doc, {
          startY: 30,
          head: [["Data", "Título", "Conteúdo"]],
          body: safeList(listaAnotacoes).map((a: any) => [
            a.dt_anotacao ? new Date(a.dt_anotacao).toLocaleDateString() : "-",
            cleanText(a.titulo || "Sem título"),
            cleanText(a.anotacao || "-"),
          ]),
          theme: "grid",
          columnStyles: { 2: { cellWidth: 100 } },
          headStyles: { fillColor: [99, 102, 241] },
        });
      }

      doc.save(`Relatorio_${perfil.ra || "Escolar"}.pdf`);
      doToast();
    } catch (error) {
      console.error(error);
      showAlert("Erro", "Erro ao gerar o PDF. Verifique sua conexão.", "error");
    } finally {
      setLoading(false);
    }
  }

  // --- 2. FUNÇÃO DE ALTERAR SENHA ---
  async function handleChangePassword() {
    if (!newPassword) {
      showAlert("Atenção", "Digite uma nova senha.", "info");
      return;
    }
    try {
      setLoading(true);
      await api.patch("/usuario/", { senha_hash: newPassword });

      setShowPasswordModal(false);
      setNewPassword("");
      showAlert("Sucesso", "Senha alterada com sucesso!", "success");
    } catch (error: any) {
      console.error("Erro senha:", error);
      if (error.response?.status === 422) {
        showAlert("Erro", "Formato de senha inválido.", "error");
      } else {
        showAlert("Erro", "Não foi possível alterar a senha.", "error");
      }
    } finally {
      setLoading(false);
    }
  }

  // --- 3. FUNÇÃO DE DELETAR CONTA ---
  function handleDeleteAccountRequest() {
    setShowDeleteModal(true);
  }

  async function confirmDeleteAccount() {
    try {
      setLoading(true);
      setShowDeleteModal(false);

      const cleanData = async (
        listUrl: string,
        deleteUrlFn: (id: any) => string,
        idField: string
      ) => {
        try {
          const response = await api.get(listUrl);
          const items = extractData(response);
          if (items.length > 0) {
            await Promise.all(
              items.map((item: any) => api.delete(deleteUrlFn(item[idField])))
            );
          }
        } catch (err: any) {
          if (err.response && err.response.status !== 404)
            console.error(`Erro limpar ${listUrl}`, err);
        }
      };

      await cleanData("/anotacao/", (id) => `/anotacao/${id}`, "id_anotacao");
      await cleanData(
        "/calendario/",
        (id) => `/calendario/${id}`,
        "id_data_evento"
      );
      await cleanData("/notas/", (id) => `/notas/${id}`, "id_nota");
      await cleanData("/horario/", (id) => `/horario/${id}`, "id_horario");

      await api.delete("/usuario/");

      showAlert(
        "Conta Deletada",
        "Sua conta e todos os dados foram removidos com sucesso.",
        "success",
        () => {
          localStorage.removeItem("access_token");
          navigate("/login");
        }
      );
    } catch (error: any) {
      console.error("Erro ao deletar:", error);
      if (error.response?.status === 500) {
        showAlert(
          "Erro de Servidor",
          "O servidor impediu a exclusão pois ainda existem dados vinculados que não conseguimos limpar.",
          "error"
        );
      } else if (error.code === "ERR_NETWORK") {
        showAlert(
          "Erro de Rede",
          "O servidor parece instável ou travou. Tente novamente em alguns instantes.",
          "error"
        );
      } else {
        showAlert(
          "Erro",
          "Não foi possível deletar a conta. Tente novamente.",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="px-10 py-8 flex flex-col gap-y-8 relative min-h-screen">
      <section className="flex text-white gap-x-2 font-extrabold items-end justify-center">
        <h1 className="text-3xl">CONFIGURAÇÃO</h1>
        <Gear size={32} weight="fill" />
      </section>

      <section className="flex w-full flex-wrap gap-y-4">
        <SettingButton onClick={handleDownloadPDF} disabled={loading}>
          <DownloadSimple size={24} weight="fill" />
          {loading ? "Baixando..." : "Download da Agenda"}
        </SettingButton>

        <SettingButton
          onClick={() => setShowPasswordModal(true)}
          disabled={loading}
        >
          <LockOpen size={24} weight="fill" />
          Alterar senha
        </SettingButton>

        <SettingButton onClick={handleDeleteAccountRequest} disabled={loading}>
          <ArrowCounterClockwise size={24} weight="fill" />
          {loading ? "Processando..." : "Deletar conta"}
        </SettingButton>
      </section>

      {alertModal.show && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-6 animate-fade-in">
          <div className="bg-[#1e2038] border border-gray-600 w-full max-w-sm p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center">
            <div className="mb-4 text-white">
              {alertModal.type === "success" && (
                <CheckCircle size={48} className="text-green-500" />
              )}
              {alertModal.type === "error" && (
                <Warning size={48} className="text-red-500" />
              )}
              {alertModal.type === "info" && (
                <Info size={48} className="text-blue-400" />
              )}
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              {alertModal.title}
            </h2>
            <p className="text-gray-300 mb-6">{alertModal.message}</p>
            <button
              onClick={() => {
                setAlertModal((prev) => ({ ...prev, show: false }));
                if (alertModal.onClose) alertModal.onClose();
              }}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6 animate-fade-in">
          <div className="bg-[#1e2038] border border-red-900/50 w-full max-w-sm p-6 rounded-2xl shadow-2xl">
            <div className="flex flex-col items-center text-center mb-6">
              <Warning size={48} className="text-red-500 mb-4" weight="fill" />
              <h2 className="text-xl font-bold text-white mb-2">
                Tem certeza?
              </h2>
              <p className="text-gray-300 text-sm">
                Essa ação apagará sua conta e{" "}
                <strong>todos os seus dados</strong> (notas, calendário,
                anotações).
                <br />
                <br />
                Essa ação não pode ser desfeita.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2 rounded-lg font-bold text-gray-300 border border-gray-600 hover:bg-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteAccount}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition-colors"
              >
                Sim, Deletar
              </button>
            </div>
          </div>
        </div>
      )}

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-[#1e2038] border border-gray-600 w-full max-w-sm p-6 rounded-2xl shadow-2xl">
            <div className="flex justify-between items-center mb-6 text-white">
              <h2 className="text-xl font-bold">Nova Senha</h2>
              <button onClick={() => setShowPasswordModal(false)}>
                <X size={24} />
              </button>
            </div>
            <input
              type="password"
              placeholder="Nova senha"
              className="w-full p-3 rounded-lg bg-[#2c2f50] text-white border border-gray-600 mb-6 focus:border-indigo-500 outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              onClick={handleChangePassword}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
